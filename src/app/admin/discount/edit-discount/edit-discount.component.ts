import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Discount } from "../../../Models/Discount";
import { DiscountService } from "../../../Services/discount.service";


@Component({
  selector: 'ngx-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.scss']
})
export class EditDiscountComponent implements OnInit {
  // id:any;
  discount:Discount ={_id:0,discountPercent: 0,code:"" ,valid:true};
  buttonSubmit: boolean = false;
  discountForm = new FormGroup({
    discountPercent: new FormControl(null, [Validators.required]),
    code: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
        ]),
      valid: new FormControl(null, [ Validators.required,]),
   
  });
  eMsg: string;
  errorMsg: string;
  invalidDis: boolean = false;
 
  constructor(private discountService: DiscountService, private router: Router,private activatedRoute:ActivatedRoute) {
   
  }

  ngOnInit(): void {
    this.discount._id= this.activatedRoute.snapshot.params.id;
    this.discountService.getDiscount(this.discount._id).subscribe((result:any)=>{
      this.discount = result.result


    })
 
  }
  get discountPercent() {
    return this.discountForm.get('discountPercent');
  }
  get code() {
    return this.discountForm.get('code');
  }
  get valid() {
    return this.discountForm.get('valid');
  }
 

  onSubmit(body: any) {
    this.buttonSubmit = true;
    this.discountService.editDiscount(this.discount._id , body).subscribe((result:any)=>{
      this.router.navigate(["admin/discount/all-discount"]);
      }, (e) => {
        this.eMsg = e.error.message;
        if (this.eMsg == "Error: COUD_IS_FOUNDED") {
          this.errorMsg = `${body.code} already founded `;
          this.invalidDis = true;
        }
       this.buttonSubmit = false;

      }
     
    );
  }
 

}
