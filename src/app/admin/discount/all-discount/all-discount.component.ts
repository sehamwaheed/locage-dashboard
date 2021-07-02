import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Discount } from "../../../Models/Discount";
import { DiscountService } from "../../../Services/discount.service";

@Component({
  selector: 'ngx-all-discount',
  templateUrl: './all-discount.component.html',
  styleUrls: ['./all-discount.component.scss']
})
export class AllDiscountComponent implements OnInit {
  discounts:Discount[]=[];
  p:number ;
  totalItems:number;
 
  constructor(private discountService:DiscountService , private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.gty(this.p);
  }
  gty(page: any){
    this.discountService.getAll(page).subscribe((result: any) => {            
      this.discounts = result.result.docs;
       this.totalItems = result.result.totalDocs;
      });

    }

    deleteDiscount(id:any){
      this.discountService.deletDiscount(id).subscribe((result:any) => { 
        });
    }
    editDiscount(id:any){
      this.router.navigate(["../edit-discount/"+id], { relativeTo: this.route });
    }
}
