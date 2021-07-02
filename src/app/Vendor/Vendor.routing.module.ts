import { SalesReportsComponent } from "./Reports/SalesReports/SalesReports.component";
import { CatalogPerformanceComponent } from "./Reports/Catalog-performance/Catalog-performance.component";

import { PromotionComponent } from "./Promotion/Promotion/Promotion.component";
import { AddProductComponent } from "./Product/AddProduct/AddProduct.component";
import { OrderComponent } from "./Order/order/order.component";
import { VendorComponent } from "./Vendor.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditProductComponent } from "./Product/EditProduct/EditProduct.component";
import { ManageImageComponent } from "./Product/ManageImage/ManageImage.component";
import { FormEditProductComponent } from "./Product/EditProduct/FormEditProduct/FormEditProduct.component";
import { ProfileComponent } from "./Profile/profile/profile.component";

const routes: Routes = [
  {
    path: "",
    component: VendorComponent,
    children: [
      /*================================ Product ==============================*/

      { path: "product/add", component: AddProductComponent },
      { path: "product/edit", component: EditProductComponent },

      { path: "product/editForm/:id", component: FormEditProductComponent },
      { path: "product/images", component: ManageImageComponent },
      /*================================ order ==============================*/

      { path: "order", component: OrderComponent },

      /*================================  promotion ==============================*/

      { path: "promotion", component: PromotionComponent },

      /*================================ Reports ==============================*/
      { path: "report/catalog", component: CatalogPerformanceComponent },
      { path: "report/sales_report", component: SalesReportsComponent },
      /*================================ Profile ==============================*/
      { path: "profile", component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutesModule {}
