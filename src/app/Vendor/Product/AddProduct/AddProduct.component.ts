import {
  NbComponentStatus,
  NbDateService,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from "@nebular/theme";
import { CustomValidator } from "./../../../common_validator/CustomValidator";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from "@angular/forms";
import { CategoryService } from "./../../../Services/Category.service";
import { Category } from "./../../../Models/Category";
import { Product } from "./../../../Models/Product";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { ProductService } from "../../../Services/Product.service";
import { NbWindowService } from "@nebular/theme";
import * as moment from "moment";
import { Subcategory } from "../../../Models/subCategory";

@Component({
  selector: "app-AddProduct",
  templateUrl: "./AddProduct.component.html",
  styleUrls: ["./AddProduct.component.scss"],
})
export class AddProductComponent implements OnInit {
  //list of steper
  list = [
    "chooses Category",
    "product Inforamtion",
    "More information",
    " Prices",
    "Images",
  ];

  selectedMainCategory: Category = null;
  Selectedsubcategory: any;
  Categories: Category[] = [];
  subCategory: Subcategory[] = [];
  Colors: any[] = [];
  customColor: string[] = [
    "red",
    "black",
    "green",
    "blue",
    "#f4f9f9",
    "#aaaaaa",
  ]; //this array to custom color
  images: string[] = [];
  selectedColor = null; //colorpacker
  date: any;
  descriptionSpecifiction: any;
  min: Date; //min range
  max: Date; //max range
  product = new FormData();
  product_Inforamtion: FormGroup;
  product_price: FormGroup;
   categories:FormGroup;
  //*================================ end of variables ==============================*/

  constructor(
    private _ctegory: CategoryService,
    private _product: ProductService,
    protected dateService: NbDateService<Date>,
    private window: NbWindowService,
    private fb: FormBuilder,
    private toast: NbToastrService
  ) {
    /*-------------------------------- validation for product information  ------------------------------*/

    this.product_Inforamtion = this.fb.group({
      productName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
          CustomValidator.checkSpaceInInput,
        ],
      ],

      productDescription: [
        "",
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(200),
          CustomValidator.checkSpaceInInput,
        ],
      ],

      brand: ["", [Validators.required, CustomValidator.checkSpaceInInput]],

      size: ["", [Validators.required, CustomValidator.checkSpaceInInput]],

      weight: [
        "",
        [Validators.required, Validators.min(10), Validators.max(1000000)],
      ],

      quantity: ["", [Validators.required, Validators.min(1)]],

      sku: ["", [Validators.minLength(5), CustomValidator.checkSpaceInInput]],
    });

    /*================================ validation for product price ==============================*/

    this.product_price = this.fb.group({
      price: ["", [Validators.required, Validators.min(1)]],
      discount: [null, [Validators.min(2)]],
    });


    this.categories=this.fb.group({
      mainCategory:[null,Validators.required],
      subCategory:[null,Validators.required]
    })
  }

  ngOnInit() {
    this._ctegory.getCategories();
    this._ctegory.getCategoryWithoutLoad().subscribe((c: any) => {
      this.Categories = c;
    });
    /**========================================================================
     *                         to add range in datepacker
     *========================================================================**/
    this.min = this.dateService.addMonth(this.dateService.today(), 0);
    this.max = this.dateService.addMonth(this.dateService.today(), 2);
  } //end onint

  onMainCategorySelect(id) {
    this._ctegory.getSubCategoryOfMaincategory(id).subscribe((data: any) => {
      this.subCategory = data.result[0].subcategories;
      this.selectedMainCategory = id;
    });
  }

  handleDateChange(event) {
    if (event.end) {
      let start = moment.utc(event.start, "DD-MM-YYYY", true).toDate();

      let end = moment.utc(event.end, "DD-MM-YYYY", true).toDate();

        this.date = { start: start, end: end };

        this.product_price.updateValueAndValidity();


    }else{

      this.product_price.setErrors({});
      this.showToast(
        "danger",
        "Ivalid Data  ",
        "your date is invalid "
      )
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
    if (!this.Colors.includes(this.selectedColor)) {
      this.Colors.push(this.selectedColor);
    }
  }

  deleteColor() {
    this.Colors = [];
  }

  removeColor(_color) {
    this.Colors.splice(_color, 1);
  }

  /*================================ end of color ==============================*/

  /*================================ image upload ==============================*/

  previewImge(event) {
    //let file = event.target.files[0] as File;
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.product.append("photos", files[i], files[i].name);
      this.images.push(URL.createObjectURL(files[i]));
    }

    //this.product.append('photos', files, files.name);
  }

  deleteImage(_img) {
    this.images.splice(_img, 1);
  }

  /*================================ end image upload ==============================*/

  /*================================ get form Control for product ==============================*/

  get ProductName(): any {
    return this.product_Inforamtion.get("productName");
  }

  get ProductDescription(): any {
    return this.product_Inforamtion.get("productDescription");
  }

  get Brand(): any {
    return this.product_Inforamtion.get("brand");
  }

  get Size(): any {
    return this.product_Inforamtion.get("size");
  }

  get Weight(): any {
    return this.product_Inforamtion.get("weight");
  }

  get Quantity(): any {
    return this.product_Inforamtion.get("quantity");
  }

  get Sku(): any {
    return this.product_Inforamtion.get("sku");
  }

  get Price(): any {
    return this.product_price.get("price");
  }
  get Discount(): any {
    return this.product_price.get("discount");
  }

  get DiscountDate(): any {
    return this.product_price.get("discountdate");
  }

  onChange(_ckEditor) {
    this.descriptionSpecifiction = _ckEditor.editor.getData();
  }

  createProduct() {
    this.product.append("title", this.ProductName.value);
    this.product.append("description", this.ProductDescription.value);
    this.Colors.forEach((element) => {
      this.product.append("color", element);
    });
    this.product.append("price", this.Price.value);
    this.product.append("brand", this.Brand.value);
    this.product.append("Weight", this.Weight.value);
    this.product.append("size", this.Size.value);
    this.product.append("quantity", this.Quantity.value);
    this.product.append("discount", this.Discount?.value || 0);
    this.product.append("discountDate.start", this.date?.start);
    this.product.append("discountDate.end", this.date?.end);
    this.product.append("productSpecifications", this.descriptionSpecifiction);
    this.product.append("subcategoryId", this.categories.get('subCategory').value);
    this.product.append("sku", this.Sku.value);

    this._product.addProduct(this.product);




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
}
