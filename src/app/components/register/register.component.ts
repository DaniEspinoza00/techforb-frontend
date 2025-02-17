import { RegisterService } from './../../services/register.service';
import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { passwordPattern } from '../../models/password-pattern';
import { RegisterRequest } from '../../models/registerRequest';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  public onDisplayLogin = output<boolean>();
  private registerService = inject(RegisterService);
  readonly confirmed = inject(MatDialog);
  private snackBar = inject(MatSnackBar)

  registerForm = this.formBuilder.group(
    {
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      confirm: ['', [Validators.required]]
    }
  );
  ngOnInit(): void {
    this.registerForm.get('confirm')?.valueChanges.subscribe(() => {
      this.verifyPassword();
    });
  }

  verifyPassword(): void {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirm')?.value;
    if (password !== confirmPassword) {
      this.registerForm.get('confirm')?.setErrors({ DoNotMatch: true });
    } else {
      this.registerForm.get('confirm')?.setErrors(null);
    }
  }
  register() {
    if (this.registerForm.valid) {
      const registerRequest:RegisterRequest={
        username:this.registerForm.value.username||"",
        email:this.registerForm.value.email||"",
        password:this.registerForm.value.password||""
      }
       this.registerService.register(registerRequest).subscribe(
        {
          next:()=>{
            this.openSuccessDialog('registrado','0ms','0ms');
          },
          error:()=>{
            this.snackBar.open('Se produjo un error al crear el usuario, intente nuevamente', 'Cerrar', { duration: 3000 });
          }
        }
      ) 

    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  displayLogin() {
    this.onDisplayLogin.emit(true);
  }

    private openSuccessDialog(data: string, enterAnimationDuration: string, exitAnimationDuration: string): void { 
      this.confirmed.open(ConfirmComponent, {
        width: '500px',
        data: data,
        enterAnimationDuration,
        exitAnimationDuration,
      }).afterClosed().subscribe(()=>{
        window.location.reload();
      });
    }

}
