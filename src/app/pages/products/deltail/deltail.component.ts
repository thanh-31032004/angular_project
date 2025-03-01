import { Component, inject } from '@angular/core';
import { Product } from '../../../type/product';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-deltail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './deltail.component.html',
  styleUrl: './deltail.component.css'
})
export class DeltailComponent {
  product!: Product | undefined;
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  constructor(
    private snackbarService: SnackbarService
  ) { }
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
}
