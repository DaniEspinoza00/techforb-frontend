import { Component } from '@angular/core';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidenavComponent,DashboardContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
