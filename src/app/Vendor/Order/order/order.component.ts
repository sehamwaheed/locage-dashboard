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
  constructor(private orderServic:OrderService) { }

  ngOnInit() {

    this.orderServic.getOrdersVendor();
    this.orderServic.getOrdersWithoutLoad().subscribe((data)=>{
      this.orders=[...data];
    })
  }
}
