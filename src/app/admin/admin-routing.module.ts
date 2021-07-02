import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
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


const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      //vendor
      { path: "vendor/review", component: ReviewListComponent },
      { path: "vendor/stores", component: AllStoresComponent },

      //product
      { path: "product/all", component: AllComponent },
      { path: "product/top-deal", component: TopDealsComponent },
      { path: "product/today-deal", component: TodayDealsComponent },

      //order
      { path: "order/all-order", component: AllOrderComponent },
      { path: "order/stutus/:id", component: StatusComponent },

      //discount
      { path: "discount/all-discount", component: AllDiscountComponent },
      { path: "discount/add-discount", component: AddDiscountComponent },
      { path: "discount/edit-discount/:id", component: EditDiscountComponent },

      //review
      { path: "review/product/:id", component: ProductReviewComponent },
      { path: "review/vendor/:id", component: VendorReviewComponent },
      //category
      { path: "category/all", component: AllCategoriesComponent },
      { path: "category/product-count", component: ProductsCountComponent },
      { path: "category/add", component: AddComponent },

      //subcatgory
      { path: "subcategories", component: SubcategoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
