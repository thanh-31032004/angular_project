import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../type/category';
import { CategoryService } from '../../../../service/category.service';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  categories: Category[] = [];
  
  categoryService = inject(CategoryService)

  constructor() { }

  categoryForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [])
  })

  addCategory(): void {
    this.categoryService.addCategory(this.categoryForm.value).subscribe({
      next: (category) => {
        this.categories.push(category);
        this.categoryForm.reset();
        console.log('thong bao + chuyen trang');
      },
      error: (error) => {
        // console.error(error.message);
      },
    });
  }
}


