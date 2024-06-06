import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  $cureny = new BehaviorSubject<string>(
    localStorage.getItem('currency') || 'USD'
  );
  constructor() {}

  setItem(key: string, value: any) {
    if (key === 'currency') {
      this.$cureny.next(value);
      localStorage.setItem(key, value);
    }
  }
}
