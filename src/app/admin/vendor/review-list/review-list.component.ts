import { Component, OnInit } from "@angular/core";
import { StoreModel } from "../../../Models/Store";
import { StoreService } from "../../../Services/store.service";

@Component({
  selector: "ngx-review-list",
  templateUrl: "./review-list.component.html",
  styleUrls: ["./review-list.component.scss"],
})
export class ReviewListComponent implements OnInit {
  stores: StoreModel[];
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getOnHoldStores().subscribe((result: any) => {
      this.stores = result.stores;
    });
  }

  approve(id: any) {
    this.storeService.approveStores(id).subscribe((result: any) => {
      if (result.message == "APPROVED") {
        this.stores = this.stores.filter((store) => store._id != id);
      }
    });
  }

  disapprove(id: any) {
    this.storeService.disapproveStores(id).subscribe((result: any) => {
      if (result.message == "DISAPPROVED") {
        this.stores = this.stores.filter((store) => store._id != id);
      }
    });
  }
}
