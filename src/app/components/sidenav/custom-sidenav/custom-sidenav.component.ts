import { menuItem } from './../../../models/menu-content';
import { Component, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [MatListModule, RouterModule, MatIconModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent{

  menuItem=menuItem;

  hover=input.required<boolean>();


  get imageSize(): number {
    return this.hover() ? 100 : 50;
  }
}
