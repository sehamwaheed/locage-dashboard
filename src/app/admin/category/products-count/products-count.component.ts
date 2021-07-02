import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Services/Category.service';

@Component({
  selector: 'ngx-products-count',
  templateUrl: './products-count.component.html',
  styleUrls: ['./products-count.component.scss']
})
export class ProductsCountComponent implements OnInit {

  categoriesWithProductsCount: any[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesWithProducts().subscribe((result: any) => {
      this.categoriesWithProductsCount = result.result;
    });
  }

}
