import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../Models/Category';
import { Subcategory } from '../../../Models/subCategory';
import { CategoryService } from '../../../Services/Category.service';
import { SubcategoryService } from '../../../Services/subcategory.service';

@Component({
  selector: 'ngx-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {

  subcategories: Subcategory[];
  categories: Category[]
  subcategory: Subcategory;
  formData: FormData = new FormData();

  constructor(private subcategoryService: SubcategoryService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    // get all subcategories
    this.subcategoryService.getSubcategories().subscribe((result: any) => {
      this.subcategories = result.result;
    });

    // get all categories to populate category dropdown menu
    this.categoryService.getAllCategory().subscribe((result: any) => {
      this.categories = result.result;
    });
  }

  // save the data of the subcategory to edit or delete on modal open
  openModal(_subcategory: Subcategory) {
    this.subcategory = _subcategory;
  }

  deleteSubcategory(confirmationModal: any) {
    this.subcategoryService.deleteSubcategory(this.subcategory._id).subscribe((result: any) => {
      this.ngOnInit();
    })
  }

  // save the selected image (if selected)
  onfileselected(event: any){
    const selectedfile = event.target.files[0];
    this.formData.append('photo', selectedfile, selectedfile.name);
  }

  onEditSubcategory(subcategoryForm: NgForm) {
    this.formData.append('name', 
      (subcategoryForm.value.name)? subcategoryForm.value.name : this.subcategory.name
    );
    this.formData.append('categoryId', 
      (subcategoryForm.value.categoryId)? subcategoryForm.value.categoryId : this.subcategory.categoryId._id
    );
    this.subcategoryService.editSubcategory(this.subcategory._id, this.formData).subscribe((result: any) => {
      this.ngOnInit();
      this.formData.delete('name');
      this.formData.delete('categoryId');
      this.formData.delete('photo');
    },
    (error: Error) => {
      this.formData.delete('name');
      this.formData.delete('categoryId');
      this.formData.delete('photo');
    });
  }

}
