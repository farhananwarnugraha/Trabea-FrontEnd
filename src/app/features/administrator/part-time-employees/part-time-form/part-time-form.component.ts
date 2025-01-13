import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PartTimeService } from '../part-time.service';
import { PartTimeData } from '../part-time.model';

@Component({
  selector: 'app-part-time-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './part-time-form.component.html',
  styleUrl: './part-time-form.component.css'
})
export class PartTimeFormComponent implements OnInit{
  @Input() partTimeId? : number;
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _service = inject(PartTimeService);

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    if(this.partTimeId){
      this._service.getPartTimeEmployee(this.partTimeId).subscribe((result) =>{
        this.formControl.controls.firstName.setValue(result.response.firstName);
        this.formControl.controls.lastName.setValue(result.response.lastName);
        this.formControl.controls.address.setValue(result.response.address);
        this.formControl.controls.personalEmail.setValue(result.response.personalEmail);
        this.formControl.controls.personalPhoneNumber.setValue(result.response.personalPhoneNumber);
        this.formControl.controls.lastEducation.setValue(result.response.lastEducation);
        this.formControl.controls.onGoingEducation.setValue(result.response.onGoingEducation)
      })
    }
  }
  formControl = new FormGroup({
    firstName: new FormControl<string>('', {validators: [Validators.required]}),
    lastName: new FormControl<string>('', {validators: [Validators.required]}),
    address: new FormControl<string>('', {validators: [Validators.required]}),
    personalEmail: new FormControl<string>('', {validators: [Validators.required, Validators.email]}),
    personalPhoneNumber: new FormControl<string>('', {validators: [Validators.required]}),
    lastEducation: new FormControl<string>('', {validators: [Validators.required]}),
    onGoingEducation: new FormControl<string>('', {validators: [Validators.required]}),
  });

  onSubmit(){
    if(this.formControl.valid){
      if(this.partTimeId){
        this._updatePartTimeEmployee(this.partTimeId, this.formControl.value as PartTimeData);
      }else{
        this._insertPartTimeEmployee(this.formControl.value as PartTimeData);
      }
    }else{
      window.alert('Data Belum Lengkap')
    }
  }

  private _insertPartTimeEmployee(partTimeData: PartTimeData){
    this._service.insertPartTimeEmployee(partTimeData).subscribe({
      next: (response) => {
        window.alert(`${response.fullName} Berhasil di tambahkan sebagai Part Time Employee`);
        this._router.navigate(['/part-time-employees'], {relativeTo: this._route});
      },
      error: (err) => {
        window.alert('Gagal Menambahkan data!' + `${err.message}`);
      }
    })
  }

  private _updatePartTimeEmployee(partTimeId: number, partTimeData: PartTimeData){
    this._service.updatePartTimeEmployee(partTimeId, partTimeData).subscribe({
      next: () => {
        window.alert('Data Berhasil di Update');
        this._router.navigate(['/part-time-employees'], {relativeTo: this._route});
      },
      error: (err) => {
        window.alert('Gagal Menambahkan data!' + `${err.message}`);
      }
    })
  }

}
