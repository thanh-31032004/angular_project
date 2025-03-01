import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ProductService } from '../../../../service/product.service';
import { Product } from '../../../../type/product';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../../../service/snackbar.service';
import { NgFor, NgIf } from '@angular/common';
import { Category } from '../../../../type/category';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, FormsModule, NgFor, NgIf],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  productService = inject(ProductService);
  categories: Category[] = []
  paginatedProducts: any[] | undefined;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  snackbarService = inject(SnackbarService)

  categoryId: string | undefined
  // ngOnInit: Get all products, thêm thông báo, tìm kiếm, phân trang
  ngOnInit() {
    this.productService
      .getAllProduct()
      .subscribe({
        next: (products) => {
          this.products = products.filter(prouduct => prouduct.showProduct !== false);
          this.snackbarService.showSuccess('Call API successfully');
          this.filteredProducts = products;
          this.updatePaginatedProducts();

        },
        error: (error) => {
          this.snackbarService.showError('Call API Failed');
          // console.error(error.message);
        },
      });
  }

  //Phân trang sản phẩm admin
  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.products.length);
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get pages(): number[] {
    const pagesArray = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }
  //Tìm kiếm sản phẩm admin
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  //Xóa sản phẩm admin
  handleDeleteProduct(id: number) {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          (this.products = this.products.filter(
            (product) => product.id !== id
          )),
            this.snackbarService.showSuccess('Product deleted successfully.');
          window.location.reload()
        },
        error: (error) => {
          this.snackbarService.showError('Failed to delete product. Please try again.');
        }
      });
    }
  }

}