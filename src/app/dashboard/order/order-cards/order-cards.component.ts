import { Component } from '@angular/core';
import { OrderCardData } from '../../../interfaces/order-interfaces';
import { LocalStorageService } from '../../../services/local-storage.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-cards',
  templateUrl: './order-cards.component.html',
  styleUrl: './order-cards.component.css',
})
export class OrderCardsComponent {
  cardData: OrderCardData | undefined;
  currency = '';
  constructor(
    private localStorageService: LocalStorageService,
    private orderService: OrderService
  ) {
    this.orderService.$cardData.subscribe((cardData) => {
      this.cardData = cardData;
    });
    this.localStorageService.$cureny.subscribe((currency) => {
      this.currency = currency;
    });
  }
}
