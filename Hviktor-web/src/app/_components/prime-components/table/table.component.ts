import { Component } from '@angular/core';

interface Product {
  id?: number,
  code?: string,
  name?: string,
  description?: string,
  price?: number,
  category?: string,
  quantity?: number,
  inventoryStatus?: string,
  rating?: number
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  products!: Product[];

  ngOnInit() {
    this.products = [
      {
        id: 1000,
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: 1001,
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        price: 48,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4
      },
    ]
  }

  refresh(){
    window.location.reload();
  }

}
