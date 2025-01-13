import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../Auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  isAuthenticated!: boolean;
  email!: string | null;
  role!:string | null;

  private authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.isLoginS$.subscribe((result) => {
      console.log(result)
      this.isAuthenticated = result;
      this.authService.currentLoginUser$.subscribe({
        next: (user) => {
          console.log(this.isAuthenticated)
          console.log(user?.email);
          if(user){
            this.email = user.email;
            this.role = user.role
          }
          else{
            this.email = null
          }
        }
      })
    })
  }
}
