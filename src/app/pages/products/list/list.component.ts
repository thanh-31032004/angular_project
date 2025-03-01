import { Component, inject } from '@angular/core';
import { Product } from '../../../type/product';
import { ProductService } from '../../../service/product.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  productService = inject(ProductService);

  // ngOnInit
  ngOnInit() {
    this.productService
      .getAllProduct()
      .subscribe((products) => {
        this.products = products;
        this.filteredProducts = products;
      });
  }
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
