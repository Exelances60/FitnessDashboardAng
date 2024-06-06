import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/product-interface';
interface ColumnItem {
  name: string;
  responsive?: string[];
}

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
})
export class ProductsTableComponent {
  listOfColumms: ColumnItem[] = [
    {
      name: 'Image',
    },
    {
      name: "Product's Name",
    },
    {
      name: 'Price',
    },
    {
      name: 'Amount',
    },
    {
      name: 'Category',
      responsive: ['md'],
    },
    {
      name: 'Action',
    },
  ];
  @Input() isLoading = false;
  @Input() products: Product[] = [];
  @Input() totalProducts = 0;
  constructor() {}
  currentPageDataChange($event: readonly Product[]): void {}
}
