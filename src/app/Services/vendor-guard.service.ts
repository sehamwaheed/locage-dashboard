import { Injectable } from "@angular/core";
import { ActivatedRoute, CanActivate, Router } from "@angular/router";
import { UserModel } from "../Models/User";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class VendorGuardService implements CanActivate {
  user!: UserModel;
  constructor(
    protected router: Router,
    protected auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.auth.returnUserDetails().subscribe((result: UserModel) => {
      this.user = result;
    });
  }

  canActivate() {
    if (this.user) if (this.user.role == "vendor") return true;

    this.router.navigate(["../auth"]);
    return false;
  }
}
