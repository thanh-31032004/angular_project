import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../type/product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  apiURL = 'http://localhost:3000/products';

  constructor() { }
  // getAllProduct
  getAllProduct() {
    return this.http.get<Product[]>(this.apiURL);
  }
  // getDetailProduct
  // getProductDetail(id: number) {
  //   return this.http.get(`${this.apiURL}/${id}`);
  // }
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  getProductDetail(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }
  // createProduct
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiURL, product);
  }
  // updateProduct
  editProduct(product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiURL}/${id}`, product);
  }
  // deleteProduct
}
