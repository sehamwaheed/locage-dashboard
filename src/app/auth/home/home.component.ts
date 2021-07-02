import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserModel } from "../../Models/User";
import { AuthService } from "../../Services/auth.service";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn().subscribe((result: boolean) => {
      if (!result) {
        this.router.navigate(["../login"], { relativeTo: this.route });
      }
      this.authService.returnUserDetails().subscribe((result: UserModel) => {
        if (result) {
          if (result.role == "admin") {
            this.router.navigate(["/admin"]);
          } else if (result.role == "vendor") {
            this.router.navigate(["/vendor"]);
          }
        }
      });
    });
  }
}
