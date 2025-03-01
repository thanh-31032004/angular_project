import { Component, inject } from '@angular/core';
import { User } from '../../../../type/user';
import { UserService } from '../../../../service/user.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListUserComponent {
  users: User[] = [];
  userService = inject(UserService);
  ngOnInit(): void {

    this.userService
      .getAllUser()
      .subscribe({
        next: (user) => {
          this.users = user;
        },
        error: (error) => {

        },
      });
  }
  handleDeleteUser(id: string) {
    if (window.confirm('Bạn chắc chắn muốn xóa không?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((product) => product.id !== id);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  }
}
