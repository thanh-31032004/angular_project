import { Component, inject } from '@angular/core';
import { Category } from '../../../../type/category';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../service/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  categories: Category[] = [];
  categoryService = inject(CategoryService)
  route = inject(ActivatedRoute);
  categoryID: number | undefined

  constructor() { }

  categoryForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [])
  })

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.categoryID = param['id'];
      this.categoryService.getServiceDetail(param['id']).subscribe({
        next: (data) => {

          // update data vao addProductForm
          this.categoryForm.patchValue(data);
        },
        error: (error) => {
          // show thong bao error
          console.error(error);
        },
      });
    });
  }
  editCategory(): void {
    if (!this.categoryID) return;
    this.categoryService
      .editCategory(this.categoryForm.value, this.categoryID)
      .subscribe({
        next: () => {

          console.log('thong bao + chuyen trang');
        },
        error: (error) => {
          // show error
          console.error(error.message);
        },
      });
    // if (this.categoryForm.valid) {
    //   const newCategory: Category = {
    //     id: this.categoryID++,
    //     title: this.categoryForm.value.title,
    //     description: this.categoryForm.value.description
    //   };
    //   this.route.params.subscribe((params) => {
    //     this.categoryService.editCategory(newCategory, params['id']).subscribe(category => {
    //       this.categories.push(category);
    //       this.categoryForm.reset();
    //     });
    //   });
    // }
  }
}
