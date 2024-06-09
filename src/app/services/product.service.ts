import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  AddProductResponse,
  GetProductsResponse,
  Product,
} from '../interfaces/product-interface';
import { BehaviorSubject, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  $products = new BehaviorSubject<Product[]>([]);

  private handleProductEvent(event: HttpEvent<AddProductResponse>) {
    if (event.type === HttpEventType.Response) {
      if (event.body?.product) {
        this.$products.next([...this.$products.value, event.body.product]);
      }
      return event.body?.message;
    }
    return null;
  }

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

  addProductWithImage(productData: any, image: File) {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    formData.append('image', image);
    return this.addProduct(formData);
  }

  addProduct(product: FormData) {
    return this.http
      .post<AddProductResponse>(
        `${environment.apiUrl}/products/add-product`,
        product,
        {
          reportProgress: true,
          observe: 'events',
        }
      )
      .pipe(
        map((response) => this.handleProductEvent(response)),
        catchError((error) => {
          return error;
        })
      );
  }
}
