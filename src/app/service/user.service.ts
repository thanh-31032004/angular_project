import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../type/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  apiURL = 'http://localhost:3000/users';
  constructor() { }
  getAllUser() {
    return this.http.get<User[]>(this.apiURL);
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURL, user);
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
