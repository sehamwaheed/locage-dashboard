import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderAdminService {

  private uri: String = "https://locage.herokuapp.com/api/v1/admin/orders/";

  constructor(private http: HttpClient) {}

  getAll(p:any) {
    return this.http.get(`${this.uri}?page=${p}`);
  }

  getVendor(vendorId:any) {
    return this.http.get(`${this.uri}vendor/`+vendorId);
  }

  changeStuts(id:any ,body:any){
    return this.http.patch(`${this.uri}`+id+'/status' , body);
  
  }

  getOrder(id:any){
    return this.http.get(`${this.uri}`+id);

  }
}
