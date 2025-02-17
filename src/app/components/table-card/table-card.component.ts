import { DeletePlantDialogComponent } from './delete-plant-dialog/delete-plant-dialog.component';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, output, ViewChild } from '@angular/core';
import { columnHeaders } from '../../models/dashboard-models/dashboad-table-headers';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { plantData } from '../../models/dashboard-models/plant-data';
import { PlantService } from '../../services/plant/plant.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TableCardDetailsComponent } from './table-card-details/table-card-details.component';
import { MatButtonModule } from '@angular/material/button';
import { NewPlantDialogComponent } from './new-plant-dialog/new-plant-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Plant } from '../../models/dashboard-models/plant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditPlantDialogComponent } from './edit-plant-dialog/edit-plant-dialog.component';
import { SensorEntity } from '../../models/dashboard-models/addSensor';
import { forkJoin } from 'rxjs';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-table-card',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatIconModule, MatButtonModule, TableCardDetailsComponent],
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.css'
})
export class TableCardComponent implements AfterViewInit, OnInit {

  private snackBar = inject(MatSnackBar)
  public displayDetailsMap: { [key: number]: boolean } = {};//identificador del boton de la fila.
  //para los inputs de los sensores por planta
  public idPlant: number = 0;
  public plantCountry: string = '';
  public plantName: string = '';
  //output para el padre
  updateHeaderCard = output<boolean>();


  //tabla
  public dataSource: MatTableDataSource<plantData>
  headers = columnHeaders;
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public selectedRow: number | null = null;

  //servicios
  private plantService = inject(PlantService);

  //dialogs
  readonly dialog = inject(MatDialog);
  readonly confirmed = inject(MatDialog);

  constructor() {
    this.dataSource = new MatTableDataSource<plantData>();
    this.displayedColumns = this.headers.map(headers => headers.name);
  }
  ngOnInit(): void {
    this.getAllPlants();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllPlants() {
    this.plantService.getAllPlants().subscribe(
      {
        next: (response) => {
          this.dataSource.data = response;
        }
      }
    )
  }
  //mostrar sensores
  plantDetails(element: plantData) {
    this.idPlant = element.id;
    this.plantCountry = element.country;
    this.plantName = element.name;
    if (this.selectedRow === element.id) {
      this.selectedRow = null;
      this.displayDetailsMap[element.id] = !this.displayDetailsMap[element.id];
    } else {
      this.selectedRow = element.id;
      this.displayDetailsMap[element.id] = !this.displayDetailsMap[element.id];
    }
  }
  isDisabled(element: plantData): boolean {
    return this.selectedRow != null && this.selectedRow !== element.id; //si retornamos ture, lo deshabilitamos
  }

  //crear planta
  openDialogNewPlant(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NewPlantDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result) {
        this.createNewPlant(result); 
      } else {
        this.snackBar.open('Se canceló la creación de la planta', 'Cerrar', { duration: 1000 });
      }

    });
  }
  //editar planta
  openDialogEditPlant(country: string, name: string, id: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const plant: Plant = {id: id, country: country, name: name}
    this.dialog.open(EditPlantDialogComponent, {
      width: '700px',
      data: plant,
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result) {
        this.editPlant(result, id).subscribe(
          {
            next: () => {
              this.getAllPlants();
              this.updateHeader();
              this.idPlant=0;
            },
            error: (error) => {
              console.log(error);
              this.snackBar.open('Ocurrio un error en la edición de la planta', 'Cerrar', { duration: 1000 });
            }
          }
        );
        this.openSuccessDialog('editada','0ms','0ms');
      } else {
        console.log("no editado");
        this.snackBar.open('Se canceló la edición de la planta', 'Cerrar', { duration: 1000 });
      }
    });
  }

  openDialogDeletePlant(country: string, name: string, id: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const plant: Plant = {id: id, country: country, name: name};
    this.dialog.open(DeletePlantDialogComponent,{
      width: '700px',
      data: plant,
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result) {
        this.deletePlant(result);
      } else {
        console.log("no editado");
        this.snackBar.open('Se canceló la eliminación de la planta', 'Cerrar', { duration: 1000 });
      }
    });
  }

  private deletePlant(id:number){
    this.plantService.deletePlant(id).subscribe(
      {
        next:()=>{
          this.getAllPlants();
          this.updateHeader();
          this.idPlant=0;
          this.openSuccessDialog('eliminada','0ms','0ms');
        }
      }
    )
  }

  private createNewPlant(result: Plant) {
    const newPlant: Plant = {
      country: result.country,
      name: result.name
    }
    this.plantService.createPlant(newPlant).subscribe(
      {
        next: () => {
          this.snackBar.open('Planta creada con exito', 'Cerrar', { duration: 1000 });
          this.openSuccessDialog('creada','0ms','0ms');
        }
      }
    )
  }
  private editPlant(result: SensorEntity[], id: number) {
    const sensorMapped = result.map(r =>
      this.plantService.addSensorToPlant(r, id)
    );
    return forkJoin(sensorMapped); //esperamos a que terminen todas las llamadas put
  }

  private updateHeader(): void {
    this.updateHeaderCard.emit(false)
  }

  private openSuccessDialog(data: string, enterAnimationDuration: string, exitAnimationDuration: string): void { 
    this.confirmed.open(ConfirmComponent, {
      width: '500px',
      data: data,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
}
