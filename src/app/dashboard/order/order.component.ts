import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  loading = true;
  constructor(private orderService: OrderService) {
    this.orderService.getOrders().subscribe((response) => {
      this.loading = false;
    });
  }
}
