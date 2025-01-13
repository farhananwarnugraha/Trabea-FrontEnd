import { Component } from '@angular/core';
import { SidenavComponent } from "../../shared/components/sidenav/sidenav.component";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-administrator',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent, RouterOutlet],
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.css'
})
export class AdministratorComponent {

}
