import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private uri: String = "https://locage.herokuapp.com/api/v1/admin/reviews/";

  constructor(private http: HttpClient) {}

  getProductReview(p:any ,productId:any) {
    return this.http.get(`${this.uri}product/`+productId+`?page=${p}`);
  }

  getVendorReview(p:any ,vendorId:any) {
    return this.http.get(`${this.uri}vendor/`+vendorId+`?page=${p}`);
  }
}
