import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../Models/Category";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  Categories: Category[] = [];
  private categoryLoad = new Subject<Category[]>();
  private readonly apiCategory = "https://locage.herokuapp.com/api/v1/admin/category";

  getCategoryWithoutLoad() {
    return this.categoryLoad.asObservable();
  }

  getAllCategory() {
    return this.http.get(this.apiCategory);
  }
  getCategories(){
    this.http.get(this.apiCategory).subscribe((data: any)=>{
      this.Categories = [...data.result];
      this.categoryLoad.next([...data.result])
    })
  }

  getcategoriesWithSubcategories() {
    return this.http.get(this.apiCategory + "/all");
  }

  getCategoriesWithProducts() {
    return this.http.get(this.apiCategory + "/products");
  }

  getSubCategoryOfMaincategory(categorId) {
    return this.http.get(this.apiCategory + "/" + categorId);
  }

  addCategory(formData: FormData) {
    return this.http.post(this.apiCategory, formData);
  }

  addSubcategory(formData: FormData, categoryId: String) {
    return this.http.post(this.apiCategory + '/' + categoryId + '/subcategory', formData);
  }

  deleteCategory(categoryId: String) {
    return this.http.delete(this.apiCategory + '/' + categoryId);
  }

  editCategory(formData: FormData, categoryId: String) {
    return this.http.patch(this.apiCategory + '/' + categoryId, formData);
  }
}
