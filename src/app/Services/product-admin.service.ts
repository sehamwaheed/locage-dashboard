import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProductAdminService {
  private uri: String = "https://locage.herokuapp.com/api/v1/admin/products/";

  constructor(private http: HttpClient) {}

  getAll(page:any) {
    return this.http.get(`${this.uri}?page=${page}`);
  }

  getTopDeals() {
    return this.http.get(`${this.uri}top-deals`);
  }

  getTodayDeals(page:any) {
    return this.http.get(`${this.uri}today-deals?page=${page}`);
  }
}
