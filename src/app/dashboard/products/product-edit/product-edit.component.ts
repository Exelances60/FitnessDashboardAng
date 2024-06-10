import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../interfaces/product-interface';
import { LocalStorageService } from '../../../services/local-storage.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ProductEditComponent {
  orderCreateVisible = false;
  currency = '';
  product: Product | undefined;
  constructor(
    private activeRoute: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {
    this.product = this.activeRoute.snapshot.data['product'];
    this.activeRoute.data.subscribe(({ product }) => {
      this.product = product;
    });
    this.localStorageService.$cureny.subscribe((currency) => {
      this.currency = currency;
    });
  }

  openOrderCreate() {
    this.orderCreateVisible = true;
  }
}
