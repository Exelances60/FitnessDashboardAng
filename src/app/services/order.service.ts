import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GetOrderResponse,
  Order,
  OrderCardData,
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
  $cardData = new BehaviorSubject<OrderCardData | undefined>(undefined);
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
          this.$cardData.next(response.cardData);
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
          this.getOrders().subscribe();
          this.$orders.next(
            this.$orders.value.map((orderMap) =>
              orderMap._id === response.order._id ? response.order : orderMap
            )
          );
          return response.message;
        })
      );
  }

  completeOrder(orderId: string) {
    return this.http
      .post<UpdateOrderResponse>(
        `${environment.apiUrl}/orders/ordercompleted`,
        {
          orderId,
        }
      )
      .pipe(
        map((response) => {
          this.getOrders().subscribe();
          return response.message;
        })
      );
  }
}
