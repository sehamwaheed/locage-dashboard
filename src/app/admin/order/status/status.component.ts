import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Order } from "../../../Models/Order";
import { OrderAdminService } from "../../../Services/order-admin.service";


@Component({
  selector: 'ngx-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  order:Order ={_id:0,status:"",name:"",address:"",phoneNumber:"",totalProducts:0 , totalprice :0 ,userId:""};
  OrderStatus:string[]=[ "processing",
    "preparing" ,
    "shipping",
    "cancelled",
    "pickedup"];
  buttonSubmit: boolean = false;
  orderForm = new FormGroup({
    totalPrice: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [ Validators.required]),
    address: new FormControl(null, [ Validators.required,]),
    phoneNumber: new FormControl(null, [ Validators.required,]),
    createdAt: new FormControl(null, [ Validators.required,]),
    totalProducts: new FormControl(null, [ Validators.required,]),
    status: new FormControl(null, [ Validators.required,]),
  });
  eMsg: string;
  errorMsg: string;
  invalidDis: boolean = false;
 
  constructor(private orderAdminService: OrderAdminService, private router: Router,private activatedRoute:ActivatedRoute) {
   
  }

  ngOnInit(): void {
    this.order._id= this.activatedRoute.snapshot.params.id;
    this.orderAdminService.getOrder(this.order._id).subscribe((result:any)=>{
      this.order = result.result


    })
 
  }
  get totalPrice() {
    return this.orderForm.get('totalPrice');
  }
  get name() {
    return this.orderForm.get('name');
  } 
   get address() {
    return this.orderForm.get('address');
  }  
  get phoneNumber() {
    return this.orderForm.get('phoneNumber');
  } 
   get totalProduct() {
    return this.orderForm.get('totalProduct');
  } 
   get createAt() {
    return this.orderForm.get('createAt');
  } 
   get status() {
    return this.orderForm.get('status');
  }

 

  onSubmit(body: any) {
    this.buttonSubmit = true;
    this.orderAdminService.changeStuts(this.order._id , body).subscribe((result:any)=>{
      this.router.navigate(["admin/order/all-order"]);
      }, (e) => {
        this.eMsg = e.error.message;
          this.buttonSubmit = false;

      }
     
    );
  }

}
