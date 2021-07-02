import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private uri: String = "https://locage.herokuapp.com/api/v1/admin/discounts/";

  constructor(private http: HttpClient) {}

  getAll(p:any) {
    return this.http.get(`${this.uri}?page=${p}`);
  }

  getDiscount(discountId:any) {
    return this.http.get(`${this.uri}`+discountId);
  }
  addDiscount(body:any) {
    return this.http.post(`${this.uri}`,body);
  }
    editDiscount(discountId:any , body:any) {
    return this.http.patch(`${this.uri}`+discountId , body);
  }
  deletDiscount(discountId:any) {
    return this.http.delete(`${this.uri}`+discountId);
  }
 
}
