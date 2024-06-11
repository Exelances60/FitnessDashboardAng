import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GetOrderResponse,
  OrderForm,
  OrderResponse,
} from '../interfaces/order-interfaces';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
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
    return this.http.get<GetOrderResponse>(
      `${environment.apiUrl}/orders/get-orders`
    );
  }
}
