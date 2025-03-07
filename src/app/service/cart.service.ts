// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem, Product } from '../type/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = {
    id: 'cart-1',
    user: 'user-1',
    products: [],
  };

  private cartSubject = new BehaviorSubject<Cart>(this.cart);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product) {
    const existingItem = this.cart.products.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.products.push({ product, quantity: 1 });
    }

    this.cartSubject.next({ ...this.cart });
  }

  updateQuantity(productId: number, quantity: number) {
    this.cart.products = this.cart.products.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );

    this.cartSubject.next({ ...this.cart });
  }

  getTotalQuantity(): number {
    return this.cart.products.reduce((total, item) => total + item.quantity, 0);
  }
  removeFromCart(productId: number) {
    this.cart.products = this.cart.products.filter((item) => item.product.id !== productId);
    this.cartSubject.next({ ...this.cart });
  }
}
