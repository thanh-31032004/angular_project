import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../type/category';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient);
  apiURL = 'http://localhost:3000/category';
  constructor() { }

  getAllCategories() {
    return this.http.get<Category[]>(this.apiURL);
  }
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURL, category);
  }
  editCategory(category: Category, id: number): Observable<Category> {
    return this.http.put<Category>(`${this.apiURL}/${id}`, category);
  }
  getServiceDetail(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiURL}/${id}`);
  }

}
