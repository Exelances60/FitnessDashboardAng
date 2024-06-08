import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/product-interface';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ProductService } from '../../../services/product.service';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { UserService } from '../../../services/user.service';

interface ColumnItem {
  name: string;
  responsive?: string[];
  customFilter?: boolean;
  sortFn?: NzTableSortFn<Product> | null;
  sortDirections?: NzTableSortOrder[] | null;
  sortOrder?: NzTableSortOrder | null;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn<Product> | null;
  filterMultiple?: boolean;
}

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
})
export class ProductsTableComponent {
  categoryList: { text: string; value: string }[] = [];
  currency = '';
  listOfColumms: ColumnItem[] = [
    { name: 'Image' },
    { name: "Product's Name", customFilter: true },
    {
      sortOrder: null,
      name: 'Price',
      sortFn: (a: Product, b: Product) => a.price - b.price,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Amount',
      sortOrder: null,
      sortFn: (a: Product, b: Product) => a.amount - b.amount,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Category',
    },
    { name: 'Action' },
  ];
  nameFilter = false;
  @Input() isLoading = false;
  @Input() products: Product[] = [];
  @Input() totalProducts = 0;
  displayData: Product[] = [];
  constructor(
    private localStorageService: LocalStorageService,
    private productService: ProductService,
    private userService: UserService
  ) {
    this.localStorageService.$cureny.subscribe((currency) => {
      this.currency = currency;
    });
    this.productService.$products.subscribe((productsMap) => {
      this.displayData = [...productsMap];
    });
    this.userService.$user.subscribe((user) => {
      this.categoryList = user?.productCategory.map((category) => ({
        text: category,
        value: category,
      })) as { text: string; value: string }[];
      this.updateCategoryFilter();
    });
  }

  updateCategoryFilter(): void {
    this.listOfColumms[4] = {
      name: 'Category',
      listOfFilter: this.categoryList,
      filterFn: (list: string[], item: Product) =>
        list.some((category) => item.category.indexOf(category) !== -1),
    };
  }

  onFilterByName(name: string): void {
    this.displayData = this.products.filter(
      (product) => product.name.indexOf(name) !== -1
    );
  }
  onResetFilter(name: string): void {
    this.onFilterByName('');
  }
}
