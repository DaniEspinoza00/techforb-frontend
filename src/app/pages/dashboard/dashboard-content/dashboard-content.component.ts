import { LoginService } from './../../../services/login.service';
import { menuItem } from './../../../models/menu-content';
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { SensorCardService } from '../../../services/sensor/sensor-card.service';
import { sensorCardItem } from '../../../models/dashboard-models/sensorCarditem';
import { TableCardComponent } from '../../../components/table-card/table-card.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [CardComponent, TableCardComponent, MatIconModule, MatMenuModule ,CommonModule, RouterModule, RouterLink, MatToolbarModule],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.css'
})
export class DashboardContentComponent implements OnInit {

  public sensorLabel: string[] = ['Lecturas OK', 'Alertas medias', 'Alertas rojas', 'Sensores deshabilitados'];
  public sensorIcon: string[] = ['ok', 'media', 'red', 'disabled'];
  public sensorSum: number[] = [];
  public sensorCardItem: sensorCardItem[] = [];
  public username = sessionStorage.getItem('user');
  menuItem=menuItem;

  private sensorCardService = inject(SensorCardService);
  private loginService=inject(LoginService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getSensorCard();
  }

  getSensorCard() {
    this.sensorCardService.getSensorHeaderCard().subscribe(
      {
        next: (response) => {
          this.sensorSum = Object.values(response);
          this.sensorCardItem = this.sensorSum.map((sensor, index) => ({
            key: this.sensorLabel[index],
            value: sensor,
            icon: this.sensorIcon[index]
          }))
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  updateHeader() {
    this.getSensorCard();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['home']);
    }
}
