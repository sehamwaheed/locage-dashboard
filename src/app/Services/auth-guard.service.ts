import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  isLogin!: boolean;
  constructor(protected router: Router, protected auth: AuthService) {
    this.auth.loggedIn().subscribe((result: boolean) => {
      this.isLogin = result;
    });
  }

  canActivate() {
    if (this.isLogin) return true;

    this.router.navigate(["/auth"]);
    return false;
  }
}
