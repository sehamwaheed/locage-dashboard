import { AdminGuardService } from "./Services/admin-guard.service";
import { VendorGuardService } from "./Services/vendor-guard.service";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

export const routes: Routes = [
  {
    path: "vendor",
    loadChildren: () =>
      import("./Vendor/Vendor.module").then((m) => m.VendorModule),
    canActivate: [VendorGuardService],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AdminGuardService],
  },
  { path: "", redirectTo: "auth", pathMatch: "full" },

  { path: "**", redirectTo: "auth" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
