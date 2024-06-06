import { Component } from '@angular/core';

@Component({
  selector: 'app-currency-menu',
  templateUrl: './currency-menu.component.html',
  styleUrl: './currency-menu.component.css',
})
export class CurrencyMenuComponent {
  currentCurrency = localStorage.getItem('currency') || 'USD';
  currencyChange(currency: string): void {
    localStorage.setItem('currency', currency);
    this.currentCurrency = currency;
  }
}
