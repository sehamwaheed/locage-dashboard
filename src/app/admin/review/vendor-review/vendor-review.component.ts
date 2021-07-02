import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Review } from "../../../Models/Review";
import { ReviewService } from "../../../Services/review.service";

@Component({
  selector: "ngx-vendor-review",
  templateUrl: "./vendor-review.component.html",
  styleUrls: ["./vendor-review.component.scss"],
})
export class VendorReviewComponent implements OnInit {
  product: Review[] = [];
  vendor: any;
  id: any;
  p: number;
  totalItems: number;

  constructor(
    private reviewService: ReviewService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.gty(this.p);
  }
  gty(page: any) {
    this.reviewService
      .getVendorReview(page, this.id)
      .subscribe((result: any) => {
        this.vendor = result.VENDOR;
        this.product = result.result;
      });
  }
}
