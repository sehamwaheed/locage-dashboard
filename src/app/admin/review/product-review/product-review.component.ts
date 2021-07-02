import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Review } from "../../../Models/Review";
import { ReviewService } from "../../../Services/review.service";

@Component({
  selector: "ngx-product-review",
  templateUrl: "./product-review.component.html",
  styleUrls: ["./product-review.component.scss"],
})
export class ProductReviewComponent implements OnInit {
  reviews: Review[] = [];
  id: any;
  p: number;
  totalItems: number;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.gty(this.p);
  }
  gty(page: any) {
    this.reviewService
      .getProductReview(page, this.id)
      .subscribe((result: any) => {
        this.reviews = result.result.docs;
        this.totalItems = result.result.totalDocs;
      });
  }
}
