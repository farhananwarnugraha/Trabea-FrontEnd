import { Component, inject, NgModule, OnInit } from '@angular/core';
import { Parttimeemployee } from '../partimeemployee.model';
import { PartimeserviceService } from '../partimeservice.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-part-time-list-employee',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './part-time-list-employee.component.html',
  styleUrl: './part-time-list-employee.component.css'
})
export class PartTimeListEmployeeComponent implements OnInit {
  partTimeEmployees!: Parttimeemployee [];
  pageNumber: number = 1;
  totalPage: number = 0;
  headers: string[] = ['Action', 'Full Name', 'Personal Email', 'Work Email', 'Phone Number', 'Join Since'];

  private _parttimeService = inject(PartimeserviceService);
  // private _route = inject(ActivatedRoute);
  // private _router = inject(Router);

  filterForm = new FormGroup({
    name: new FormControl<string>('')
  })

  ngOnInit(): void {
    this.loadPartTimeEmployee();
  }

  private loadPartTimeEmployee(){
    this._parttimeService.getAllPartTimeEmployee(this.pageNumber, this.filterForm.controls.name.value || '').subscribe({
      next: (response) => {
        if(response?.response?.partTimeEmployees?.length > 0){
          this.partTimeEmployees = response.response.partTimeEmployees;
          this.totalPage = response.response.paginations.totalPages;
          console.log(this.partTimeEmployees);
        }else{
          console.log('No Data')
          this.partTimeEmployees = [];
        }
      }
    })
  }

}
