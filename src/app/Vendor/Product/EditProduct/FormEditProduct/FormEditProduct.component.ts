
import {
  FormBuilder,
  FormGroup,
  RequiredValidator,
  Validators,
} from "@angular/forms";

import { Product } from "./../../../../Models/Product";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { ProductService } from "../../../../Services/Product.service";
import {
  NbComponentStatus,
  NbDateService,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from "@nebular/theme";
import { NbWindowService } from "@nebular/theme";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
@Component({
  selector: "app-FormEditProduct",
  templateUrl: "./FormEditProduct.component.html",
  styleUrls: ["./FormEditProduct.component.scss"],
})
export class FormEditProductComponent implements OnInit {
  product: Product;
  selectedColor = null; //colorpacker
  customColor: string[] = [
    "red",
    "black",
    "green",
    "blue",
    "#f4f9f9",
    "#aaaaaa",
  ]; //this array to custom color
  min: Date; //min range
  max: Date; //max range
  formEdit: FormGroup;
  date: string = "";
  id: any;

  constructor(
    private _product: ProductService,
    protected dateService: NbDateService<Date>,
    private window: NbWindowService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toast: NbToastrService
  ) {} //* end of Constructor

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    /*================================  to add range in datepacker ==============================*/
    this.min = this.dateService.addMonth(this.dateService.today(), 0);
    this.max = this.dateService.addMonth(this.dateService.today(), 2);
    // this.min = moment().subtract(1, 'months').startOf('month').toDate();
    // this.max = moment().add(1, 'months').endOf('month').toDate();

    this.formEdit = this.fb.group({
      _id: [""],
      title: this.fb.control("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      description: this.fb.control("", [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(200),
      ]),
      price: this.fb.control("", [Validators.required, Validators.min(1)]),
      discount: this.fb.control("", [Validators.min(2)]),
      discountDate: this.fb.control("", []),
      brand: this.fb.control("", [Validators.required]),
      size: this.fb.control("", [Validators.required]),
      Weight: this.fb.control("", [
        Validators.required,
        Validators.min(10),
        Validators.max(1000000),
      ]),
      quantity: this.fb.control("", [Validators.required, Validators.min(1)]),
      sku: this.fb.control("", [Validators.minLength(5)]),
      color: this.fb.control([], []),
      productSpecifications: this.fb.control("", [Validators.required]),
      vendorId: this.fb.control("", []),
      photos: this.fb.control("", []),
    });

    this._product.getProductById(this.id).subscribe((data: any) => {
      this.product = data;

          console.log(data);
          console.log(this.product);

          this.formEdit.patchValue(data);

          if (data.discountDate.start) {


            this.date = `${new Date(data.discountDate.start).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })} - ${new Date(data.discountDate.start).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}`;
          }






      // if ( data.discountDate.start != null )  {

      //   console.log("d5lt");

      //   let start = new Date(data.discountDate.start);
      //   let end = new Date(data.discountDate.end);
      //   data.discountDate = { start, end };

      //   this.date= data.discountDate;
      // }
      // this.formEdit.patchValue(data);

    });
  } //* end of onInit

  /*================================ handeler datepicker ==============================*/
  handleDateChange(event) {
    let start = moment.utc(event.start, "DD-MM-YYYY", true).toDate();

    if (event.end) {
      let end = moment.utc(event.end, "DD-MM-YYYY", true).toDate();

      this.formEdit.get("discountDate").setValue({ start: start, end: end });
    }
  }

  /*================================ Color Window ==============================*/

  openWindowForm(color) {
    this.window.open(color, { title: `Choose Color` });
  }

  changeColorHandeler(_color) {
    this.selectedColor = _color;
  }

  addColor() {
    let color = this.selectedColor;
    // this.formEdit.get("selectedColor").value;
    this.product.color.push(color);
  }
  deletColor(_color) {
    this.product.color.splice(_color, 1);
  }

  clearAll() {
    this.product.color = [];
  }

  update() {
    let data = this.formEdit.value;
    this._product.editProduct(data);

    this.showToast("success", "Updated Valid  ", "your Product is Updated ");
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? `${title}` : "";

    this.toast.show(body, `${titleContent}`, config);
  }


    isValidDate(d:any) {
    return d instanceof Date && !isNaN(+d);
  }
}
