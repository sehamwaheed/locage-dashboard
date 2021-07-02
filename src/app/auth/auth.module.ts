import { FormsModule } from "./../pages/forms/forms.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { NbLayoutModule } from "@nebular/theme";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [AuthComponent, LoginComponent, HomeComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NbLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AuthModule {}
