import { Injectable } from "@angular/core";
import { ActivatedRoute, CanActivate, Router } from "@angular/router";
import { UserModel } from "../Models/User";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuardService implements CanActivate {
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
    if (this.user) if (this.user.role == "admin") return true;

    this.router.navigate(["../auth"]);
    return false;
  }
}
