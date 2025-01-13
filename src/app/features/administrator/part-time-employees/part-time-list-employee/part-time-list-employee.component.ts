import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PartTimeService } from '../part-time.service';
import { Parttimeemployee } from '../part-time.model';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-part-time-list-employee',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './part-time-list-employee.component.html',
  styleUrl: './part-time-list-employee.component.css'
})
export class PartTimeListEmployeeComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.headers);
    this.loadPartTimeEmployee();
    this.loadPartTimeEmployeeWithParams();
    this.loadFilterChange();
  }

  headers: string[] = ['Action', 'Full Name', 'Personal Email', 'Work Email', 'Phone Number', 'Join Since'];
  totalPages: number = 10;
  searchForm = new FormGroup({
    fullName: new FormControl<string>(''),
    pageNumber: new FormControl<number>(1)
  })
  partTimeEmployee!: Parttimeemployee[];
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _parttimeService = inject(PartTimeService);

  // constructor(){
  //   this.loadPartTimeEmployee();
  // }

  private loadPartTimeEmployee(){
    const queryParams = this._route.snapshot.queryParams;
    console.log(queryParams);
    this._parttimeService.getAllPartTimeEmployee(queryParams).subscribe((result) => {
      this.partTimeEmployee = result.response.partTimeEmployees;
      this.totalPages = result.response.paginations.totalPages
      console.log(this.partTimeEmployee);
      console.log(this.totalPages);
    })
  }

  private loadPartTimeEmployeeWithParams(){
    this._route.queryParams.subscribe((params) => {
      this.searchForm.patchValue(
        {
          pageNumber: +params['pageNumber'] && 1,
          fullName: params['name'] || null
        },
        { emitEvent: false }
      );
      this.loadPartTimeEmployee();
    })
  }

  private loadFilterChange(){
    this.searchForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap((valueForm) => {
        const queryParams = {
          pageNumber: 1,
          name: valueForm.fullName?.trim() || null,
        };
        this._router.navigate(['.'], { relativeTo: this._route, queryParams: queryParams, queryParamsHandling: 'merge' });
      }),
      switchMap((formValue) => {
        const filter = {
          pageNumber: 1,
          name: formValue.fullName?.trim() || null
        };
        return this._parttimeService.getAllPartTimeEmployee(filter);
      })
    ).subscribe((result) => {
      this.partTimeEmployee = result.response.partTimeEmployees;
      this.totalPages = result.response.paginations.totalPages
    })
  }
}
