import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  logout(){
    var confirmation = window.confirm("Are You Sure logout?")
    if(confirmation){
      this.authService.logOut();
      this.router.navigate(['login']);
    }
  }
}
