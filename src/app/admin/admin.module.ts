import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbMenuModule,
  NbCardModule,
  NbDialogModule,
  NbSelectModule,
} from "@nebular/theme";
import { NgxPaginationModule } from "ngx-pagination";
import { ThemeModule } from "../@theme/theme.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { AddComponent } from "./category/add/add.component";
import { AllCategoriesComponent } from "./category/all/all.component";
import { ProductsCountComponent } from "./category/products-count/products-count.component";
import { SubcategoryComponent } from "./category/subcategory/subcategory.component";
import { AddDiscountComponent } from "./discount/add-discount/add-discount.component";
import { AllDiscountComponent } from "./discount/all-discount/all-discount.component";
import { EditDiscountComponent } from "./discount/edit-discount/edit-discount.component";
import { AllOrderComponent } from "./order/all-order/all-order.component";
import { StatusComponent } from "./order/status/status.component";
import { AllComponent } from "./product/all/all.component";
import { TodayDealsComponent } from "./product/today-deals/today-deals.component";
import { TopDealsComponent } from "./product/top-deals/top-deals.component";
import { ProductReviewComponent } from "./review/product-review/product-review.component";
import { VendorReviewComponent } from "./review/vendor-review/vendor-review.component";
import { AllStoresComponent } from "./vendor/all-stores/all-stores.component";
import { ReviewListComponent } from "./vendor/review-list/review-list.component";

@NgModule({
  declarations: [
    AdminComponent,
    ReviewListComponent,
    AllStoresComponent,
    TopDealsComponent,
    TodayDealsComponent,
    AllComponent,
    AllOrderComponent,
    StatusComponent,
    AllDiscountComponent,
    AddDiscountComponent,
    EditDiscountComponent,
    ProductReviewComponent,
    AllCategoriesComponent,
    ProductsCountComponent,
    AddComponent,
    SubcategoryComponent,
    VendorReviewComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NbMenuModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbDialogModule,
    NbSelectModule,
  ],
})
export class AdminModule {}
