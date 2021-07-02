import { OrderStatus } from "./OrderStatus.enum";

export interface Order {

  _id:any;
  product_name?:string;
  quantity?:number;
  price?:number;
  statuse?:OrderStatus;
  totalprice:number;
  status:string;
  name:string;
  address:string;
  phoneNumber: string;
  trackNumber?:number;
  comment?:string;
  totalProducts:Number;
  userId:any;
  discountCode?: any;
  createdAt?:  Date;


}
