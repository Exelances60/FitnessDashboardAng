import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-currency-menu',
  templateUrl: './currency-menu.component.html',
  styleUrl: './currency-menu.component.css',
})
export class CurrencyMenuComponent {
  constructor(private localStorageService: LocalStorageService) {}
  currentCurrency = localStorage.getItem('currency') || 'USD';
  currencyChange(currency: string): void {
    this.currentCurrency = currency;
    this.localStorageService.setItem('currency', currency);
  }
}
