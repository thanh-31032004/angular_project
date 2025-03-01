import { Attribute, Component, inject } from '@angular/core';
import { ProductService } from '../../../../service/product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../../type/product';
import { CategoryService } from '../../../../service/category.service';
import { NgFor } from '@angular/common';
import { Category } from '../../../../type/category';
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  products: Product[] = []
  productID = 1;
  category: Category[] = [];
  ProductService = inject(ProductService);
  categoryService = inject(CategoryService)
  messageService = inject(MessageService)
  router = inject(Router)
  constructor() { }

  productForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    showProduct: new FormControl(true)
  })
  ngOnInit(): void {

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
  addProduct(): void {
    this.ProductService.addProduct(this.productForm.value).subscribe({
      next: (product) => {
        this.products.push(product);
        this.productForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Create product',
          detail: 'thành công'
        })
        setTimeout(() => this.router.navigate(['/admin/products/list']), 1000)
        console.log('thong bao + chuyen trang');
      },
      error: (error) => {
        // console.error(error.message);
      },
    });
  }
}
