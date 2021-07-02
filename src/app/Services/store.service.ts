import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  private uri: String = "https://locage.herokuapp.com/api/v1/admin/stores/";

  constructor(private http: HttpClient) {}

  getOnHoldStores() {
    return this.http.get(`${this.uri}hold`);
  }
  getAllStores(page:any){
    return this.http.get(`${this.uri}?page=${page}`);
  }
  approveStores(id:any) {
    return this.http.get(`${this.uri}${id}/status`);
  }
  disapproveStores(id:any) {
    return this.http.delete(`${this.uri}${id}/status`);
  }

}
