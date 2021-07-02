import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Vendor } from '../Models/Vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  vendor:Vendor;
 private readonly api ='https://locage.herokuapp.com/api/v1/stores/check';
 private readonly url='https://locage.herokuapp.com/api/v1/stores';
 private vendorLoad= new Subject<Vendor>()
 
 constructor(private http:HttpClient) { }
 
 getVendor(id){
 
   let headers = new HttpHeaders({
     'authorization': "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbmF3YWhlZWRAZ21haWwuY29tIiwiaWQiOiI2MGJmYzZhNDczNDY5ZjAwMmU4NGRhMGIiLCJpYXQiOjE2MjUwODE4NDQsImV4cCI6MTYyNTE2ODI0NH0.LZhU5AMVXqG1OO4rumfwMxlvXN4COBw_ItrA0mYIly8"
   })
 
   this.http.get<{vendor:Vendor}>(this.api+'/'+id,{headers}).subscribe((vendor:any)=>{
 
     this.vendorLoad.next(vendor)
   });
 }
 
 
 getVendorWithoutLoad(){
   return this.vendorLoad.asObservable();
 }
 
 editVendor(id, _vendor:FormData){
   let headers = new HttpHeaders({
     'authorization': "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbmF3YWhlZWRAZ21haWwuY29tIiwiaWQiOiI2MGJmYzZhNDczNDY5ZjAwMmU4NGRhMGIiLCJpYXQiOjE2MjUwODE4NDQsImV4cCI6MTYyNTE2ODI0NH0.LZhU5AMVXqG1OO4rumfwMxlvXN4COBw_ItrA0mYIly8"
   })
 
   this.http.patch(this.url+'/'+id,_vendor,{headers}).subscribe((d:any)=>{ 
     this.vendorLoad.next(d?.result);
 
   })
 }
 
 
 }
 