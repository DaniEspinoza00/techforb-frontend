import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-card-details',
  standalone: true,
  imports: [],
  templateUrl: './table-card-details.component.html',
  styleUrl: './table-card-details.component.css'
})
export class TableCardDetailsComponent {
  displayDetails=input.required<boolean>();
  idPlant=input.required<number>();
}
