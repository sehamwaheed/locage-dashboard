import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from '../Models/Order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly api ='https://locage.herokuapp.com/api/v1/orders/vendor';
  private ordersLoad= new Subject<Order[]>();
  orders:Order[]=[];
constructor(private http:HttpClient) { }

getOrdersVendor(){
  let headers = new HttpHeaders({
    'authorization': "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbmF3YWhlZWRAZ21haWwuY29tIiwiaWQiOiI2MGJmYzZhNDczNDY5ZjAwMmU4NGRhMGIiLCJpYXQiOjE2MjQzODM3OTMsImV4cCI6MTYyNDQ3MDE5M30.23IQ4paGgGGpyahtwlq_plD-nlsBI1PML53LxYgTFWs"
  })
 return this.http.get(this.api,{headers}).pipe(map((or:any)=>{
    return or?.result?.docs.map((o:any)=>{

        return {
          _id:o._id,
          product_name:o?.productId?.title,
          price:o.price,
          quantity:o.quantity,
          statuse:o?.orderId?.status,


        }


    })
 })).subscribe((order: any)=>{
    this.orders=[...order];
    this.ordersLoad.next([...this.orders]);

 })
}


getOrders(p:any){

 return this.http.get(`${this.api}?page=${p}`).pipe(map((or:any)=>{
    return or?.result?.docs.map((o:any)=>{

        return {
          _id:o._id,
          product_name:o?.productId?.title,
          price:o.price,
          quantity:o.quantity,
          statuse:o?.orderId?.status,


        }


    })
 }))
}

getOrdersWithoutLoad(){
  return this.ordersLoad.asObservable();
}
}
