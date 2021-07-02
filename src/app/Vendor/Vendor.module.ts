import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbMenuModule,
  NbButtonModule,
  NbCardModule,
  NbStepperModule,
  NbSelectModule,
  NbInputModule,
  NbDatepickerModule,
  NbPopoverModule,
  NbAlertModule,
  NbActionsModule,
  NbIconModule,
} from "@nebular/theme";

import { CKEditorModule } from "ng2-ckeditor";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxPaginationModule } from "ngx-pagination";
import { ThemeModule } from "../@theme/theme.module";
import { EditorsModule } from "../pages/editors/editors.module";
import { CategoryService } from "../Services/Category.service";
import { ProductService } from "../Services/Product.service";
import { OrderComponent } from "./Order/order/order.component";
import { AddProductComponent } from "./Product/AddProduct/AddProduct.component";
import { EditProductComponent } from "./Product/EditProduct/EditProduct.component";
import { FormEditProductComponent } from "./Product/EditProduct/FormEditProduct/FormEditProduct.component";
import { ManageImageComponent } from "./Product/ManageImage/ManageImage.component";
import { ProfileComponent } from "./Profile/profile/profile.component";
import { PromotionComponent } from "./Promotion/Promotion/Promotion.component";
import { CatalogPerformanceComponent } from "./Reports/Catalog-performance/Catalog-performance.component";
import { SalesReportsComponent } from "./Reports/SalesReports/SalesReports.component";
import { VendorComponent } from "./Vendor.component";
import { VendorRoutesModule } from "./Vendor.routing.module";

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
    VendorRoutesModule,
    NbButtonModule,
    NbCardModule,
    NbStepperModule,
    NbSelectModule,
    NbInputModule,
    EditorsModule,
    CKEditorModule,
    NbDatepickerModule,
    FormsModule,
    NbPopoverModule,
    ReactiveFormsModule,
    NbAlertModule,
    Ng2SmartTableModule,
    NbActionsModule,
    NbIconModule,
    NgxPaginationModule
  ],
  declarations: [
    VendorComponent,
    AddProductComponent,
    EditProductComponent,
    ManageImageComponent,
    OrderComponent,
    PromotionComponent,
    SalesReportsComponent,
    CatalogPerformanceComponent,
    FormEditProductComponent,
    ProfileComponent,
  ],

  providers: [ProductService, CategoryService, ReactiveFormsModule],
})
export class VendorModule {}
