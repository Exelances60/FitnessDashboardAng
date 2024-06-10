import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderForm, OrderResponse } from '../interfaces/order-interfaces';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  createOrder(order: OrderForm) {
    return this.http
      .post<OrderResponse>(`${environment.apiUrl}/orders/create-order`, order)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
