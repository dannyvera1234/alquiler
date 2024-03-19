import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { LayoutService } from '../../../../shared/services/app.layout.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    SpeedDialModule,
    ToastModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  password!: string;
  loginForm: FormGroup;
  constructor(public layoutService: LayoutService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      cedula: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          Validators.pattern(/^[A-Z][a-zA-Z0-9 ]+$/),
        ],
      ],
    });
  }

  user_validation_messages = {
    cedula: [
      {
        type: 'required',
        message: 'La cedula es requerida',
      },
      {
        type: 'pattern',
        message: 'La cedula debe contener solo numeros',
      },      
      {
        type: 'maxlength',
        message: 'La cedula debe tener 10 caracteres',
      },
      {
        type: 'minlength',
        message: 'La cedula debe tener 10 caracteres',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'La contraseña es requerida',
      },
      {
        type: 'pattern',
        message: 'La contraseña debe iniciar con mayuscula',
      },
      {
        type: 'minlength',
        message: 'La contraseña debe tener minimo 8 caracteres',
      },
      {
        type: 'maxlength',
        message: 'La contraseña debe tener maximo 10 caracteres',
      },
    ],
  };

  get cedulaValido() {
    return (
      this.loginForm.get('cedula')?.invalid &&
      this.loginForm.get('cedula')?.touched
    );
  }
  get cedulaNoValido() {
    return (
      this.loginForm.get('cedula')?.invalid &&
      this.loginForm.get('cedula')?.touched
    );
  }
  get passwordValido() {
    return (
      this.loginForm.get('password')?.invalid &&
      this.loginForm.get('password')?.touched
    );
  }
  get passwordNoValido() {
    return (
      this.loginForm.get('password')?.invalid &&
      this.loginForm.get('password')?.touched
    );
  }

  async login() {
    
  }
}

