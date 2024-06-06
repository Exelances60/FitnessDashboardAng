import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GetProductsResponse } from '../interfaces/product-interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<GetProductsResponse>(`${environment.apiUrl}/products/get-products`)
      .pipe(map((response) => response.products));
  }
}
