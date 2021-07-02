import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DiscountService } from "../../../Services/discount.service";

@Component({
  selector: 'ngx-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  buttonSubmit: boolean = false;
  discountForm = new FormGroup({
    discountPercent: new FormControl(null, [Validators.required]),
    code: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
        ]),
   
  });
  eMsg: string;
  errorMsg: string;
  invalidDis: boolean = false;
 
  constructor(private discountService: DiscountService, private router: Router,private activatedRoute:ActivatedRoute) {
   
  }

  ngOnInit(): void {
   
  }
 
  get discountPercent() {
    return this.discountForm.get('discountPercent');
  }
  get code() {
    return this.discountForm.get('code');
  }
 

  onSubmit(body: any) {
    this.buttonSubmit = true;
    this.discountService.addDiscount(body).subscribe((result: any) => {

      this.router.navigate(["../all-discount"], { relativeTo: this.activatedRoute });
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
