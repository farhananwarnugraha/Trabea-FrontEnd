import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { log } from 'node:console';
import { AuthService } from '../auth.service';
import { loginRequest } from '../user.model';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  router = inject(Router)
  private authService = inject(AuthService);
  isLogin: boolean = true;

  loginForm = new FormGroup({
    email : new FormControl<string>('', {validators: [Validators.required, Validators.email]}),
    password : new FormControl<string>('', {validators: [Validators.required]}),
    role: new FormControl<number>(0, {validators: [Validators.required]})
  })

  onSubmit(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value as loginRequest).subscribe({
        next: (userResponse) => {
          console.log(userResponse)
          if(userResponse?.response.role === 'Administrator'){
            this.router.navigate(['/part-time-employees']);
          }
          else if(userResponse?.response.role === 'PartTimer'){
            this.router.navigate(['/workSchedule']);
          }
          else if(userResponse.response.role === 'Manager'){
            this.router.navigate(['/managerial']);
          }
          this.isLogin = true;
        },
        error: () => this.isLogin = false
      })
    }

  }
}
