import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Category } from '../../../../type/category';
import { CategoryService } from '../../../../service/category.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, FormsModule, NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  category: Category[] = [];
  categoryService = inject(CategoryService);
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
  

}
