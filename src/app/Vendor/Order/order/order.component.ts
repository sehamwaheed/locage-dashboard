import { Component, OnInit } from '@angular/core';
import { Order } from '../../../Models/Order';
import { OrderService } from '../../../Services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders:Order[]=[];
  p:number ;
  totalItems:number;
  constructor(private orderServic:OrderService) { }

  ngOnInit() {


    this.orderServic.getOrdersVendor();
    this.orderServic.getOrdersWithoutLoad().subscribe((data)=>{
      this.orders=[...data];
    })


    this.gty(this.p);

  }

  gty(page: any){
    this.orderServic.getOrders(page).subscribe((result: any) => {
      console.log(result);

      this.orders = result;
       this.totalItems = result.result.totalDocs;
      })
    }

  }
