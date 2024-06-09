import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Product } from '../interfaces/product-interface';
import { catchError, map, Observable, of } from 'rxjs';

export const productResolver: ResolveFn<Product | boolean> = (
  route
): Observable<Product | boolean> => {
  const id = route.params['id'];
  const productService = inject(ProductService);
  const messageService = inject(NzMessageService);
  return productService.getProduct(id).pipe(
    map((response) => {
      return response.product;
    }),
    catchError((error) => {
      messageService.error('Product not found');
      return of(false);
    })
  );
};
