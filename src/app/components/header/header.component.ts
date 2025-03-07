import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  totalQuantity = 0;

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe((cart) => {
      this.totalQuantity = cart.products.reduce((total, item) => total + item.quantity, 0);
    });
  }
}
