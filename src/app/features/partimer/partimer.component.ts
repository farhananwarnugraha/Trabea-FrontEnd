import { Component } from '@angular/core';
import { SidenavComponent } from '../../shared/components/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-partimer',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent, RouterOutlet],
  templateUrl: './partimer.component.html',
  styleUrl: './partimer.component.css'
})
export class PartimerComponent {

}
