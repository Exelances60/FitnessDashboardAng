import { Component, Input } from '@angular/core';
import { Order } from '../../../interfaces/order-interfaces';
import { Product } from '../../../interfaces/product-interface';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-order-view-modal',
  templateUrl: './order-view-modal.component.html',
  styleUrl: './order-view-modal.component.css',
})
export class OrderViewModalComponent {
  @Input() selectedOrder!: Order | null;
  selectedOrderProducts: Product[] = [];
  currency = '';

  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService.$cureny.subscribe((currency) => {
      this.currency = currency;
    });
  }

  ngOnInit(): void {
    if (
      this.isProductArray(this.selectedOrder?.products) &&
      this.selectedOrder
    ) {
      this.selectedOrderProducts = this.selectedOrder.products;
    }
  }

  isProductArray(
    products: Product[] | string[] | undefined
  ): products is Product[] {
    if (!products) {
      return false;
    }
    return typeof products[0] === 'object';
  }
}
