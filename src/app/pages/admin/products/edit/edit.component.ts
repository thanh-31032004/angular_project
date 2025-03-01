import { Component, inject } from '@angular/core';
import { Product } from '../../../../type/product';
import { Category } from '../../../../type/category';
import { ProductService } from '../../../../service/product.service';
import { CategoryService } from '../../../../service/category.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class UpdateComponent {
  products: Product[] = []
  productID: number | undefined;
  category: Category[] = [];
  ProductService = inject(ProductService);
  categoryService = inject(CategoryService)
  route = inject(ActivatedRoute);
  router = inject(Router)

  productForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {

    this.route.params.subscribe((param) => {
      this.productID = param['id'];
      this.ProductService.getProductDetail(param['id']).subscribe({
        next: (data) => {
          // update data vao addProductForm
          this.productForm.patchValue(data);
        },
        error: (error) => {
          // show thong bao error
          console.error(error);
        },
      });
    });
    this.categoryService
      .getAllCategories()
      .subscribe({
        next: (category) => {
          this.category = category;

        },
        error: (error) => {
          // console.error(error.message);
        },
      });
  }

  editProduct(): void {
    if (!this.productID) return;
    this.ProductService.editProduct(this.productForm.value, this.productID).subscribe({
      next: (product) => {
        // this.products.push(product);
        // this.productForm.reset();
        setTimeout(() => this.router.navigate(['/admin/products/list']), 1000)
        console.log('thong bao + chuyen trang');
      },
      error: (error) => {
        // console.error(error.message);
      },
    });
  }
}
