import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private formBuilder=inject(FormBuilder);
  public onDisplayLogin=output<boolean>();

  registerForm=this.formBuilder.group({
    username:[''],
    email:[''],
    password:[''],
    confirm:['']
  })
//FALTA REGISTRAR UN USUARIO
  register() {
    throw new Error('Method not implemented.');
  }

  displayLogin(){
    this.onDisplayLogin.emit(true);
  }

}
