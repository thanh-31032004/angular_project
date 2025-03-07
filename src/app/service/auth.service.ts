import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { User } from '../type/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/users';
  constructor() { }
  login(email: string, password: string) {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const token = 'Khoa-admin';
          localStorage.setItem('token', token);
          // console.log(token)
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
