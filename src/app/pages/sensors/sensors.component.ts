import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { SensorCardService } from '../../services/sensor/sensor-card.service';
import { SensorListDTO } from '../../models/dashboard-models/sensorListDTO';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-sensors',
  standalone: true,
  imports: [MatTableModule,MatIconModule, MatButtonModule,RouterLink,MatPaginatorModule],
  templateUrl: './sensors.component.html',
  styleUrl: './sensors.component.css'
})
export class SensorsComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['ID Sensor', 'Nombre', 'Lecturas ok', 'Alerta media', 'Alerta roja', 'ID Planta'];
  sensorCardService=inject(SensorCardService);
  public dataSource:MatTableDataSource<SensorListDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(){
    this.dataSource = new MatTableDataSource<SensorListDTO>();
  }

  ngOnInit(): void {
    this.getAllSensors();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllSensors(){
    this.sensorCardService.getAllSensors().subscribe(
      {
        next:(response)=>{
          this.dataSource.data=response;
        }
      }
    )
  }
}
