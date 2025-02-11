import { Component, input } from '@angular/core';
import { sensorCard } from '../../models/dashboard-models/sensor-card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  sensorName=input.required<string>();
  sensorSum=input.required<number>();
  sensorIcon=input.required<string>();
}
