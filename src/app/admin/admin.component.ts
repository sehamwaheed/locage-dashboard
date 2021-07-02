import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../pages/admin-menu';

@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  menu=MENU_ITEMS;

}
