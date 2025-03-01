import { Component, inject } from '@angular/core';
import { Product } from '../../../../type/product';
import { ProductService } from '../../../../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deltail',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './deltail.component.html',
  styleUrl: './deltail.component.css'
})
export class ProductDeltailComponent {
  product!: Product | undefined;
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService.getProductDetail(params['id']).subscribe(product => {
        this.product = product;
      });
    }
    );
  }
}

