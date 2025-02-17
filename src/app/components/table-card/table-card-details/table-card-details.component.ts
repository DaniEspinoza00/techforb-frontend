import { MatDialog } from '@angular/material/dialog';
import { sensorsByPlant } from './../../../models/dashboard-models/sensors-plant';
import { SensorCardService } from './../../../services/sensor/sensor-card.service';
import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EditSensorDialogComponent } from '../edit-sensor-dialog/edit-sensor-dialog.component';
import { SensorEntity } from '../../../models/dashboard-models/addSensor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../confirm/confirm.component';

@Component({
  selector: 'app-table-card-details',
  standalone: true,
  imports: [],
  templateUrl: './table-card-details.component.html',
  styleUrl: './table-card-details.component.css'
})
export class TableCardDetailsComponent implements OnChanges{
  private snackBar = inject(MatSnackBar)
  displayDetails=input.required<boolean>();
  idPlant=input.required<number>();
  plantCountry=input.required<string>();
  plantName=input.required<string>();
  sensorsByPlant:sensorsByPlant[]=[];

  readonly dialog = inject(MatDialog);
  readonly confirmed = inject(MatDialog);

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
        }
      }
    )
  }

  openEditDialog(id: number, sensorName:string, enterAnimationDuration: string, exitAnimationDuration: string) {
    const sensorData={
      id:id,
      sensorName:sensorName
    }
    this.dialog.open(EditSensorDialogComponent,{
      width:'700px',
      data:sensorData,
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true
    }).afterClosed().subscribe(result=>{
      if(result){
        this.editSensor(id,result);
      }else{
        console.log("no editado");
        this.snackBar.open('Se canceló la edicion del sensor', 'Cerrar', { duration: 1000 });
      }
    })
  }
  private editSensor(id:number, sensor:SensorEntity){
    this.sensorCardService.editSensor(id,sensor).subscribe(
      {
        next:()=>{
          this.openSuccessDialog('Sensor','0ms','0ms');
        },
        error:()=>{
          this.snackBar.open('Ocurrio un error en la edición de la planta', 'Cerrar', { duration: 1000 });
        }
      }
    )
  }

    private openSuccessDialog(data: string, enterAnimationDuration: string, exitAnimationDuration: string): void { 
      this.confirmed.open(ConfirmComponent, {
        width: '500px',
        data: data,
        enterAnimationDuration,
        exitAnimationDuration,
      }).afterClosed().subscribe(result=>{
        window.location.reload();
      });
    }
}
