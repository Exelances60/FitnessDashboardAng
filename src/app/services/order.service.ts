import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GetOrderResponse,
  Order,
  OrderForm,
  OrderResponse,
  UpdateOrderResponse,
} from '../interfaces/order-interfaces';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  $orders = new BehaviorSubject<Order[]>([]);
  constructor(private http: HttpClient) {}

  createOrder(order: OrderForm) {
    return this.http
      .post<OrderResponse>(`${environment.apiUrl}/orders/create-order`, order)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  getOrders() {
    return this.http
      .get<GetOrderResponse>(`${environment.apiUrl}/orders/get-orders`)
      .pipe(
        map((response) => {
          this.$orders.next(response.orders);
          return response;
        })
      );
  }

  updateOrder(order: Order) {
    return this.http
      .put<UpdateOrderResponse>(`${environment.apiUrl}/orders/update-order`, {
        params: {
          orderId: order._id,
        },
        data: order,
      })
      .pipe(
        map((response) => {
          this.$orders.next(
            this.$orders.value.map((orderMap) =>
              orderMap._id === response.order._id ? response.order : orderMap
            )
          );
          return response.message;
        })
      );
  }
}
