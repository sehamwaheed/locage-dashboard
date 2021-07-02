import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subcategory } from '../Models/subCategory';


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private readonly subcategoryAPI = "https://locage.herokuapp.com/api/v1/admin/subcategory";

  constructor(private http: HttpClient) { }

  getSubcategories() {
    return this.http.get(this.subcategoryAPI);
  }

  deleteSubcategory(id: string) {
    return this.http.delete(this.subcategoryAPI + '/' + id);
  }

  editSubcategory(id: string, subcategory: FormData) {
    return this.http.patch(this.subcategoryAPI + '/' + id, subcategory);
  }

}
