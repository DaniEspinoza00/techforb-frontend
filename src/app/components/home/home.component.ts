import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit{
  display = signal<boolean>(true);

  ngOnInit(): void {
    console.log(this.display);
  }

  displayRegister() {
    this.display.set(false);
  }

  displayLogin() {
    this.display.set(true);
  }

}
