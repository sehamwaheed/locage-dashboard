import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../Models/Product';
import { ProductAdminService } from '../../../Services/product-admin.service';

@Component({
  selector: 'ngx-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  products: Product[];
  p:number ;
  totalItems:number;
  constructor(private productAdminService: ProductAdminService,private router: Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
   this.gty(this.p);
  }

  gty(page:any){
    this.productAdminService.getAll(page).subscribe((result: any) => {            
      this.products = result.docs;
      this.totalItems = result.totalDocs;
    });
  }
  review(id:any){
    this.router.navigate(["../../review/product/"+id], { relativeTo: this.activatedRoute });
  }
}
