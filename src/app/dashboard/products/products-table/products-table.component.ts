import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/product-interface';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ProductService } from '../../../services/product.service';
interface ColumnItem {
  name: string;
  responsive?: string[];
  customFilter?: boolean;
}

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
})
export class ProductsTableComponent {
  currency = '';
  listOfColumms: ColumnItem[] = [
    { name: 'Image' },
    { name: "Product's Name", customFilter: true },
    { name: 'Price' },
    { name: 'Amount' },
    { name: 'Category', responsive: ['md'] },
    { name: 'Action' },
  ];
  nameFilter = false;
  @Input() isLoading = false;
  @Input() products: Product[] = [];
  @Input() totalProducts = 0;
  displayData: Product[] = [];
  constructor(
    private localStorageService: LocalStorageService,
    private productService: ProductService
  ) {
    this.localStorageService.$cureny.subscribe((currency) => {
      this.currency = currency;
    });
  }

  ngOnInit(): void {
    this.productService.$products.subscribe((productsMap) => {
      this.displayData = [...productsMap];
    });
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
