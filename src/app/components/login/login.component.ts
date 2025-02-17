import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, output } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/login-request';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private cdr=inject(ChangeDetectorRef)
  public displayError:boolean=false;
  public userNotFound:string="";
  public onDisplayRegister = output<boolean>();

  loginForm = this.formBuilder.group({
    username: ['daniel', [Validators.required,]],
    password: ['987654321', Validators.required]
  })


  login() {
    if (this.loginForm.valid) {
     this.loginService.login(this.loginForm.value as LoginRequest).subscribe(
        {
          error: (errorData) => {
            this.displayError=true;
            this.userNotFound=errorData.message;
            this.cdr.detectChanges();
          },
          complete: () => {
            this.router.navigateByUrl('/dashboard');
            this.loginForm.reset
          }
        }
      ) 
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

  public displayRegister():void{
    this.onDisplayRegister.emit(false)
  }

}
