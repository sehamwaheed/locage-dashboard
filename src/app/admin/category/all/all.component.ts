import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../Models/Category';
import { CategoryService } from '../../../Services/Category.service';

@Component({
  selector: 'ngx-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  categories: any[];
  category: Category;
  formData: FormData = new FormData();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getcategoriesWithSubcategories().subscribe((result: any) => {
      this.categories = result.result;
    });
  }

  openModal(_category: Category) {
    this.category = _category;
  }

  deleteCategory(confirmationModal: any, alert: any) {
    this.categoryService.deleteCategory(this.category._id).subscribe((result: any) => {
      this.ngOnInit();
      alert.classList.remove("hide");
      alert.classList.add("show");
    })
  }

  onfileselected(event: any){
    const selectedfile = event.target.files[0];
    this.formData.append('photo', selectedfile, selectedfile.name);
  }

  onEditCategory(categoryForm: NgForm) {
    this.formData.append('name', (categoryForm.value.name)? categoryForm.value.name : this.category.name);
    this.categoryService.editCategory(this.formData, this.category._id).subscribe((result: any) => {
      categoryForm.reset();
      this.ngOnInit();
      this.formData.delete('name');
      this.formData.delete('photo');
    },
    (error: Error) => {
      this.formData.delete('name');
      this.formData.delete('photo');
    });
  }

}
