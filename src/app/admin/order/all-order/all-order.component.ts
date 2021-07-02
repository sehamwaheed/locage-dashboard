import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { Order } from "../../../Models/Order";
import { OrderAdminService } from "../../../Services/order-admin.service";


@Component({
  selector: 'ngx-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.scss']
})
export class AllOrderComponent implements OnInit {
  orders:Order[]=[];
  p:number ;
  totalItems:number;
 
  constructor(private orderAdminService:OrderAdminService , private dialogService: NbDialogService , private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.gty(this.p);
  }
  gty(page: any){
    this.orderAdminService.getAll(page).subscribe((result: any) => {            
      this.orders = result.result.docs;
       this.totalItems = result.result.totalDocs;
      });
  }

  editDiscount(id:any) {
     this.router.navigate(["../stutus/"+id], { relativeTo: this.route });
   // this.open(StatusComponent+id );
  }
  protected open(x:any) {
    this.dialogService.open(x , { context: 'this is some additional data passed to dialog' });
  }

}
