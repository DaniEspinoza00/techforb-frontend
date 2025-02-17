import { menuItem } from './../../../models/menu-content';
import { Component, inject, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';

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
  loginService=inject(LoginService);
  private router = inject(Router);

  get imageSize(): number {
    return this.hover() ? 100 : 50;
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['home']);
  }
}
