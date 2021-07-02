import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {path: "", redirectTo: '/auth/home',pathMatch: 'full'}, 

  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "login", component: LoginComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
