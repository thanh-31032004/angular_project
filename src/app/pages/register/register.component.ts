import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../type/user';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  users: User[] = [];
  Userservice = inject(UserService)
  router = inject(Router)

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cfpassword: new FormControl('', [Validators.required]),
  })

  addUser(): void {
    this.Userservice.addUser(this.userForm.value).subscribe({
      next: (user) => {
        this.users.push(user);
        this.userForm.reset();
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Create product',
        //   detail: 'thành công'
        // })
        setTimeout(() => this.router.navigate(['/login']), 1000)
        console.log('thong bao + chuyen trang');
      },
      error: (error) => {
        // console.error(error.message);
      },
    });
  }

}
