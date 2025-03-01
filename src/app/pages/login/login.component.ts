import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router)
  loginError: boolean = false;
  loginForm: FormGroup = new FormGroup({

    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),

  })
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(success => {
        if (success) {
          this.router.navigate(['/admin']);
        } else {
          // Xử lý lỗi đăng nhập
          this.loginError = true;
          // alert('Invalid email or password');
        }
      });
    }
  }
}
