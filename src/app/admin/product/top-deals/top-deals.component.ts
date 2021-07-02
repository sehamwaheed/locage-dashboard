import { Component, OnInit } from "@angular/core";
import { Product } from "../../../Models/Product";
import { ProductAdminService } from "../../../Services/product-admin.service";

@Component({
  selector: "ngx-top-deals",
  templateUrl: "./top-deals.component.html",
  styleUrls: ["./top-deals.component.scss"],
})
export class TopDealsComponent implements OnInit {
  products: Product[];
  constructor(private productAdminService: ProductAdminService) {}

  ngOnInit(): void {
    this.productAdminService.getTopDeals().subscribe((result: any) => {
      this.products = result.result.docs;
    });
  }
}
