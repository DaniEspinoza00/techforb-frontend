import { LoginService } from './../../../services/login.service';
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { SensorCardService } from '../../../services/sensor/sensor-card.service';
import { sensorCardItem } from '../../../models/dashboard-models/sensorCarditem';
import { TableCardComponent } from '../../../components/table-card/table-card.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [CardComponent,TableCardComponent,CommonModule],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.css'
})
export class DashboardContentComponent implements OnInit{
  public sensorLabel:string[]=['Lecturas OK', 'Alertas medias', 'Alertas rojas', 'Sensores deshabilitados'];
  public sensorIcon:string[]=['ok', 'media', 'red','disabled'];
  public sensorSum:number[]=[];
  public sensorCardItem:sensorCardItem[]=[];

  private sensorCardService=inject(SensorCardService);
  private loginService=inject(LoginService); //para buscar el username

  ngOnInit(): void {
    this.getSensorCard();
  }

  getSensorCard(){
    this.sensorCardService.getSensorHeaderCard().subscribe(
      {
        next:(response)=>{
          this.sensorSum = Object.values(response);
          this.sensorCardItem = this.sensorSum.map((sensor,index)=>({
            key: this.sensorLabel[index],
            value:sensor,
            icon:this.sensorIcon[index]
          }))
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }
}
