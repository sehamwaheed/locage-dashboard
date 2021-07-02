import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreModel } from '../../../Models/Store';
import { StoreService } from '../../../Services/store.service';

@Component({
  selector: 'ngx-all-stores',
  templateUrl: './all-stores.component.html',
  styleUrls: ['./all-stores.component.scss']
})
export class AllStoresComponent implements OnInit {
  stores: StoreModel[];
  p:number ;
  totalItems:number;
  constructor(private storeService: StoreService,private router: Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
      this.gty(this.p);
  }
  gty(page:any){
    this.storeService.getAllStores(page).subscribe((result:any)=>{
      this.stores = result.stores;
      this.totalItems = result.totalDocs;
    })
  }
  review(id:any){
    this.router.navigate(["../../review/vendor/"+id], { relativeTo: this.activatedRoute });
  }

}
