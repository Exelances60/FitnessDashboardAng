import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../../interfaces/order-interfaces';
import { LocalStorageService } from '../../../services/local-storage.service';
import { OrderService } from '../../../services/order.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrl: './order-update.component.css',
})
export class OrderUpdateComponent {
  @Input() order!: Order;
  updateForm: FormGroup;
  currency: string = '';

  autopTip: Record<string, Record<string, string>> = {
    en: {
      required: 'This field is required',
      minlength: 'This field must be at least 5 characters',
      email: 'Please enter a valid email address',
    },
  };

  constructor(
    private fb: FormBuilder,
    private localeStorage: LocalStorageService,
    private orderServices: OrderService,
    private messageServices: NzMessageService
  ) {
    this.updateForm = this.fb.group({
      orderOwner: ['', [Validators.required]],
      adress: ['', [Validators.required, Validators.minLength(5)]],
      orderOwnerEmail: ['', [Validators.required, Validators.email]],
      status: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      totalPrice: ['', [Validators.required]],
    });
    this.localeStorage.$cureny.subscribe((currency) => {
      this.currency = currency;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'] && this.order) {
      const commaTotalPrice = this.order.totalPrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      this.updateForm.patchValue({
        ...this.order,
        totalPrice: commaTotalPrice,
      });
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const order: Order = {
        ...this.updateForm.value,
        _id: this.order._id,
        totalPrice: this.updateForm.value.totalPrice.replace(/,/g, ''),
      };
      this.orderServices.updateOrder(order).subscribe({
        next: (message) => {
          this.messageServices.success(message);
        },
        error: (err) => {
          this.messageServices.error(err.error.errorMessage);
        },
      });
    }
  }

  commaConverter(event: Event, key: string): void {
    let value;
    let val = (event.target as HTMLInputElement).value;
    val = val.replace(/,/g, '');
    if (val.length > 3) {
      let noCommas = Math.ceil(val.length / 3) - 1;
      let remain = val.length - noCommas * 3;
      let newVal = [];
      for (let i = 0; i < noCommas; i++) {
        newVal.unshift(val.substr(val.length - i * 3 - 3, 3));
      }
      newVal.unshift(val.substr(0, remain));
      value = newVal;
    } else {
      value = val;
    }
    this.updateForm.patchValue({
      [key]: value.toString(),
    });
  }
}
