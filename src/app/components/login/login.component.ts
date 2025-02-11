import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/login-request';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
 private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

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
            console.log(errorData);
          },
          complete: () => {
            this.router.navigateByUrl('/dashboard');
            this.loginForm.reset
          }
        }
      )
    }
  }

  public displayRegister():void{
    this.onDisplayRegister.emit(false)
  }

}
