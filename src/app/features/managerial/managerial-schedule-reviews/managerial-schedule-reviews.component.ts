import { Component, createNgModule, inject, OnInit } from '@angular/core';
import { PartimerScheduleReview } from '../managerial-model.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Shifting } from '../../partimer/parttimer.model';
import { ManagerialServiceService } from '../managerial-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ParttimerserviceService } from '../../partimer/parttimerservice.service';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../Auth/auth.service';

@Component({
  selector: 'app-managerial-schedule-reviews',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './managerial-schedule-reviews.component.html',
  styleUrl: './managerial-schedule-reviews.component.css'
})
export class ManagerialScheduleReviewsComponent implements OnInit {
  ngOnInit(): void {
    this._loadReviewSchedule();
    this._loadDataWithParams();
    this._filterScheduleReview();
    this._getShift();
    this._auth();
    console.log(this.totalPage);
  }

  // onSubmit(){
  //   this._loadReviewSchedule();
  //   this._loadDataWithParams();
  //   this._filterScheduleReview();
  //   this._getShift();
  // }

  accept(scheduleId: number){
    var confimation = window.confirm("Are you sure want to approve this schedule?");
    if(confimation){
      this._managerialService.approvedSchedule(scheduleId, this.managerial).subscribe({
        next: (ress) => {
          window.alert("Schedule Approved");
          this._loadReviewSchedule();
          this._loadDataWithParams();
          this._filterScheduleReview();
        },
        error: (err) => {
          window.alert(err.message)
        }
      })
    }
  }

  reject(scheduleId: number){
    var confimation = window.confirm("Are you sure want to reject this schedule?");
    if(confimation){
      this._managerialService.rejectedSchedule(scheduleId, this.managerial).subscribe({
        next: (ress) => {
          window.alert("Schedule Rejected");
          this._loadReviewSchedule();
          this._loadDataWithParams();
          this._filterScheduleReview();
        },
        error: (err) => {
          window.alert(err.message)
        }
      })
    }
  }

  headers: string[] = ['Name', 'Purpose Date', 'Shift', 'Approval'];
  totalPage!: number;
  PartTimeEmployee!: PartimerScheduleReview[];
  shifts!: Shifting[];
  filterForm = new FormGroup({
    partTimeName: new FormControl<string>(''),
    shiftId: new FormControl<number>(0),
    startDate: new FormControl<string>(''),
    endDate: new FormControl<string>(''),
    pageNumber: new FormControl<number>(1)
  })
  isAuthenticated: boolean = false;
  managerial!: number;


  private _managerialService = inject(ManagerialServiceService);
  private _shiftingService = inject(ParttimerserviceService)
  private authService = inject(AuthService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  private _getShift(){
    this._shiftingService.getWorkShift().subscribe({
      next: (ress) => {
        this.shifts = ress.response
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }

  private _loadReviewSchedule(){
    const queryParams = this._route.snapshot.queryParams;
    this._managerialService.getScheduleReview(queryParams).subscribe({
      next: (ress) => {
        this.PartTimeEmployee = ress.response.scheduleReviews;
        this.totalPage = ress.response.paginations.totalPages;
        console.log(this.PartTimeEmployee);
        console.log(this.totalPage);
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }

  private _loadDataWithParams(){
    this._route.queryParams.subscribe((params) => {
      this.filterForm.patchValue({
        pageNumber: +params['pageNumber'] || 1,
        partTimeName: params['name'] || null,
        shiftId: params['shiftId'] || 0,
        startDate: params['startDate'] || null,
        endDate: params['endDate'] || null
      },{emitEvent: false}
  );
      this._loadReviewSchedule();
    })
  }

  private _filterScheduleReview(){
    this.filterForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap((valueForm) => {
        const queryParams = {
          pageNumber: 1,
          name: valueForm.partTimeName?.trim() || null,
          shiftId: valueForm.shiftId || 0,
          startDate: valueForm.startDate || null,
          endDate: valueForm.endDate || null
        }
        this._router.navigate(['.'], {relativeTo: this._route, queryParams: queryParams, queryParamsHandling: 'merge'});
      }),
      switchMap((formValue) => {
        const filter = {
          pageNumber: 1,
          name: formValue.partTimeName?.trim() || null,
          shiftId: formValue.shiftId || 0,
          startDate: formValue.startDate || null,
          endDate: formValue.endDate || null
        }
        return this._managerialService.getScheduleReview(filter)})
    ).subscribe((ress) => {
      this.PartTimeEmployee = ress.response.scheduleReviews;
    })
  }
  _auth(){
    this.authService.isLoginS$.subscribe((result) => {
      console.log(result)
      this.isAuthenticated = result;
      this.authService.currentLoginUser$.subscribe({
        next: (user) => {
          console.log(this.isAuthenticated)
          console.log(user?.email);
          this._managerialService.getManagerId(user?.email??"").subscribe({
            next: (ress) => {
              this.managerial = ress.response.employeeId
            },
            error: (err) => {
              console.log(err.message);
            }
          })
        }
      })
    })
  }
}
