import { Component } from '@angular/core';
import { SidenavComponent } from '../../shared/components/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-managerial',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent, RouterOutlet],
  templateUrl: './managerial.component.html',
  styleUrl: './managerial.component.css'
})
export class ManagerialComponent {

}
