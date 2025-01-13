import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParttimerserviceService } from '../parttimerservice.service';
import { Shifting, WorkScheduleForm } from '../parttimer.model';
import { AuthService } from '../../../Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requestschedule',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './requestschedule.component.html',
  styleUrl: './requestschedule.component.css'
})
export class RequestscheduleComponent implements OnInit {
  minDate: string = '';
  maxDate: string = '';
  dateMin: string = '';
  dateMax: string = '';
  shifts: Shifting[] = [];
  isAuthenticated!: boolean
  partTimer!: number;


  private _service = inject(ParttimerserviceService)
  private authService = inject(AuthService)
  private _router = inject(Router);

  ngOnInit(): void {
    this.setDateRange();
    this._getWorkShift();
    this._auth();
  }

  setDateRange(){
    const today = new Date();
    const dayOfWeek = today.getDay();

    const diffToNexWeek = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const startOfNeextWeek = new Date(today);
    startOfNeextWeek.setDate(today.getDate() + diffToNexWeek)

    const endOffNextWeek = new Date(startOfNeextWeek);
    endOffNextWeek.setDate(startOfNeextWeek.getDate() + 6);

    this.minDate = startOfNeextWeek.toISOString().split('T')[0];
    this.maxDate = endOffNextWeek.toISOString().split('T')[0];
    this.dateMin = startOfNeextWeek.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    this.dateMax = endOffNextWeek.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  private _getWorkShift(){
    this._service.getWorkShift().subscribe({
      next: (ress)=> {
        this.shifts = ress.response
      },
      error: (err) => {
        console.log(err.message);
      }
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
          this._service.getPartTimeEmployee(user?.email).subscribe({
            next: (ress) => {
              this.partTimer = ress.response.partTimeId
              this.requestScheduleForm.patchValue({partTimerId: this.partTimer})
            },
            error: (err) => {
              console.log(err.message);
            }
          })
        }
      })
    })
  }
  requestScheduleForm = new FormGroup({
      partTimerId: new FormControl<number>(0, {validators: [Validators.required]}),
      workDate: new FormControl<string>('', {validators: [Validators.required]}),
      shiftId: new FormControl<number>(0, {validators: [Validators.required]}),
  })

  private _addRequestSchedule(scheduleRequest: WorkScheduleForm){
    this._service.addRequestPartTimeSchedule(scheduleRequest).subscribe({
      next: (ress) => {
        var message = ress.message
        window.alert(message);
        this._router.navigate(['/schedule'])
      },
      error: (err) => {
        alert(err.message);
      }
    })
  }
  onSubmit(){
    console.log(this.requestScheduleForm.value);
    console.log(this.partTimer)
    this._addRequestSchedule(this.requestScheduleForm.value as WorkScheduleForm);
  }


}
