import { Component, inject } from '@angular/core';
import { Product } from '../../../type/product';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { SnackbarService } from '../../../service/snackbar.service';
import { CartService } from '../../../service/cart.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-deltail',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './deltail.component.html',
  styleUrl: './deltail.component.css'
})
export class DeltailComponent {
  product!: Product | undefined;
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  quantities: { [productId: number]: number } = {};
  constructor(
    private snackbarService: SnackbarService,
    private cartService: CartService
  ) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService.getProductDetail(params['id']).subscribe({
        next: (product) => {
          if (product) {
            this.product = product;
            this.snackbarService.showSuccess('Call API successfully');
          } else {
            this.router.navigate(['/not-found']); // Navigate to "not found" page if product is undefined
          }
        },
        error: (error) => {
          this.snackbarService.showError('Call API Failed');
          // console.error(error);
        },
      });
    }
    );
  }
  increaseQuantity(productId: number) {
    this.quantities[productId]++;
  }

  decreaseQuantity(productId: number) {
    if (this.quantities[productId] > 1) {
      this.quantities[productId]--;
    }
  } addToCart(product: Product) {
    const quantity = this.quantities[product.id];
    for (let i = 0; i < quantity; i++) {
      this.cartService.addToCart(product);
    }
  }

}
