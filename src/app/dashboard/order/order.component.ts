import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order, OrderCardData } from '../../interfaces/order-interfaces';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  loading = true;
  cardData: OrderCardData | undefined;
  orders: Order[] = [];
  constructor(private orderService: OrderService) {
    this.orderService.getOrders().subscribe((response) => {
      this.loading = false;
      this.orders = response.orders;
      this.cardData = response.cardData;
    });
  }
}
