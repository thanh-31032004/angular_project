import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../type/product';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: Cart = { id: '', user: '', products: [] };

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe((cart) => (this.cart = cart));
  }

  changeQuantity(productId: number, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
