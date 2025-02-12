import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { columnHeaders } from '../../models/dashboard-models/dashboad-table-headers';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Plant } from '../../models/dashboard-models/dataTable';
import { PlantService } from '../../services/plant/plant.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TableCardDetailsComponent } from './table-card-details/table-card-details.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table-card',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatIconModule, MatButtonModule, TableCardDetailsComponent],
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.css'
})
export class TableCardComponent implements AfterViewInit, OnInit {
  public displayDetailsMap: { [key: number]: boolean } = {};//identificador del boton de la fila.
  //para los inputs de los sensores por planta
  public idPlant: number = 0;
  public plantCountry: string = '';
  public plantName: string = '';

  //tabla
  public dataSource: MatTableDataSource<Plant>
  headers = columnHeaders;
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public selectedRow: number | null = null;

  //servicios
  private plantService = inject(PlantService);

  constructor() {
    this.dataSource = new MatTableDataSource<Plant>();
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

  plantDetails(element: Plant) {
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
  isDisabled(element: Plant): boolean {
    return this.selectedRow != null && this.selectedRow !== element.id; //si retornamos ture, lo deshabilitamos
  }
}
