import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { columnHeaders } from '../../models/dashboard-models/dashboad-table-headers';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Plant } from '../../models/dashboard-models/dataTable';
import { PlantService } from '../../services/plant/plant.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { TableCardDetailsComponent } from './table-card-details/table-card-details.component';

@Component({
  selector: 'app-table-card',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule,TableCardDetailsComponent],
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.css'
})
export class TableCardComponent implements AfterViewInit, OnInit{
  public displayDetails:boolean=false;
  public idPlant:number=0;

  public dataSource:MatTableDataSource<Plant>
  private plantService=inject(PlantService);
  headers=columnHeaders;
  displayedColumns!:string[];  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(){
    this.dataSource = new MatTableDataSource<Plant>();
    this.displayedColumns = this.headers.map(headers => headers.name);
  }
  ngOnInit(): void {
    this.getAllPlants();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllPlants(){
    this.plantService.getAllPlants().subscribe(
      {
        next:(response)=>{
          this.dataSource.data=response;
        }
      }
    )
  }
  
  plantDetails(element:Plant){
    this.idPlant=element.id;
    this.displayDetails=!this.displayDetails;
    console.log(this.idPlant, this.displayDetails);
  }
}
