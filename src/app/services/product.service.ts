import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GetProductsResponse, Product } from '../interfaces/product-interface';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  $products = new BehaviorSubject<Product[]>([]);
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<GetProductsResponse>(`${environment.apiUrl}/products/get-products`)
      .pipe(
        map((response) => {
          this.$products.next(response.products);
          return response.products;
        })
      );
  }
}
