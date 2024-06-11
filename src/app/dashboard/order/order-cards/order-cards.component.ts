import { Component, Input } from '@angular/core';
import { OrderCardData } from '../../../interfaces/order-interfaces';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-order-cards',
  templateUrl: './order-cards.component.html',
  styleUrl: './order-cards.component.css',
})
export class OrderCardsComponent {
  @Input() cardData: OrderCardData | undefined;
  currency = '';
  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService.$cureny.subscribe((currency) => {
      this.currency = currency;
    });
  }
}
