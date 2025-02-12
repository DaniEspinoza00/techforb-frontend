import { sensorsByPlant } from './../../../models/dashboard-models/sensors-plant';
import { SensorCardService } from './../../../services/sensor/sensor-card.service';
import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-card-details',
  standalone: true,
  imports: [],
  templateUrl: './table-card-details.component.html',
  styleUrl: './table-card-details.component.css'
})
export class TableCardDetailsComponent implements OnChanges{

  displayDetails=input.required<boolean>();
  idPlant=input.required<number>();
  plantCountry=input.required<string>();
  plantName=input.required<string>();
  sensorsByPlant:sensorsByPlant[]=[];

  private sensorCardService= inject(SensorCardService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idPlant'] && changes['idPlant'].currentValue !== changes['idPlant'].previousValue) {
      this.getSensorsByPlant();
    }
  }

  getSensorsByPlant(){
    this.sensorCardService.getSensorByPlantId(this.idPlant()).subscribe(
      {
        next:(response)=>{
          this.sensorsByPlant=response;
          console.log(this.sensorsByPlant);
        }
      }
    )
  }

}
