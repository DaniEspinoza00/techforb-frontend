import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { SensorCardService } from '../../../services/sensor/sensor-card.service';
import { sensorCardItem } from '../../../models/dashboard-models/sensorCarditem';
import { TableCardComponent } from '../../../components/table-card/table-card.component';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [CardComponent,TableCardComponent],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.css'
})
export class DashboardContentComponent implements OnInit{
  public sensorLabel:string[]=['Lecturas OK', 'Alertas medias', 'Alertas rojas', 'Sensores deshabilitados'];
  public sensorIcon:string[]=['ok', 'media', 'red','disabled'];
  public sensorSum:number[]=[];
  public sensorCardItem:sensorCardItem[]=[];

  private sensorCardService=inject(SensorCardService);

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
