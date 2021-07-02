import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from "@nebular/theme";
import { Vendor } from "../../../Models/Vendor";
import { AuthService } from "../../../Services/auth.service";
import { VendorService } from "../../../Services/vendor.service";

@Component({
  selector: "ngx-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  photo: string = "../../../../assets/images/upload2.png";
  formEdit: FormGroup;
  data: FormData = new FormData();
  vendor: Vendor;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,7}.com$";
  phonePattern = "^01[0125][0-9]{8}$";
  vendorId: any;
  constructor(
    private fb: FormBuilder,
    private ar: ActivatedRoute,
    private vendorService: VendorService,
    private toast: NbToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    //get id from auth service later
    // and this is for test
    let id = this.authService.tokenUser.id;
    this.formEdit = this.fb.group({
      _id: [""],
      name: this.fb.control("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      phoneNumber: this.fb.control("", [
        Validators.required,
        Validators.pattern(this.phonePattern),
      ]),
      email: this.fb.control("", [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      photo: this.fb.control("", [Validators.required]),
    });

    this.vendorService.getVendor(id);
    this.vendorService.getVendorWithoutLoad().subscribe((vendor: any) => {
      if (vendor.photo != null) {
        this.photo = vendor.photo;
      }

      this.formEdit.patchValue(vendor);
      this.vendor = vendor;
    });
  }

  onSelect(event) {
    const file = event.target.files[0];
    this.photo = URL.createObjectURL(file);
    this.data.append("photo", file, file.name);
  }

  update() {
    this.data.append("email", this.formEdit.get("email").value);
    this.data.append("phoneNumber", this.formEdit.get("phoneNumber").value);
    this.data.append("name", this.formEdit.get("name").value);
    this.vendorService.editVendor(this.vendor.userId._id, this.data);
    this.showToast("success", "Updated Valid  ", "your Store is Updated ");
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? `${title}` : "";

    this.toast.show(body, `${titleContent}`, config);
  }
}
