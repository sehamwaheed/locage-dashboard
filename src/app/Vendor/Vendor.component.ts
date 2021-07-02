import { MENU_ITEMS } from './../pages/pages-menu';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Vendor',
  templateUrl: './Vendor.component.html',
  styleUrls: ['./Vendor.component.scss']
})
export class VendorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  menu=MENU_ITEMS;
}
