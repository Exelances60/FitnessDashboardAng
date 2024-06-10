import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../interfaces/product-interface';
import { AmountValidator } from '../../../validators/AmountValidator';
import { OrderService } from '../../../services/order.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-order-form',
  templateUrl: './create-order-form.component.html',
  styleUrl: './create-order-form.component.css',
})
export class CreateOrderFormComponent {
  @Input() product: Product | undefined = undefined;
  orderForm: FormGroup;
  loading: boolean = false;

  autoTip: Record<string, Record<string, string>> = {
    en: {
      required: 'This field is required',
      minlength: 'This field must be at least 5 characters',
      email: 'Please enter a valid email address',
      amount: 'The amount should not exceed the product amount',
    },
  };

  autoTipForPhone: Record<string, Record<string, string>> = {
    en: {
      required: 'This field is required',
      pattern: 'Please enter a valid phone number',
    },
  };

  constructor(
    private fb: FormBuilder,
    private orderServices: OrderService,
    private messageService: NzMessageService
  ) {
    this.orderForm = this.fb.group({
      productName: [
        this.product?.name,
        [Validators.required, Validators.minLength(5)],
      ],
      amount: ['', [Validators.required]],
      price: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      orderOwner: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.product) {
      this.orderForm.patchValue({
        productName: this.product?.name,
      });
      this.orderForm
        .get('amount')
        ?.setValidators([
          Validators.required,
          AmountValidator(this.product?.amount),
        ]);
    }
  }

  setPrice(): void {
    this.orderForm.get('price')?.setValue('');
    if (this.orderForm.get('amount')?.value && this.product) {
      this.orderForm.patchValue({
        price: this.product?.price * this.orderForm.get('amount')?.value,
      });
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.loading = true;
      const values = {
        ...this.orderForm.value,
        productId: this.product?._id,
        creator: this.product?.ownerId,
      };
      this.orderServices.createOrder(values).subscribe({
        next: (res) => {
          if (res.status === 201) {
            this.orderForm.reset();
            this.messageService.success(res.message);
            this.product!.amount -= values.amount;
            this.loading = false;
          }
        },
        error: (err) => {
          this.messageService.error(err.error.errorMessages);
          this.loading = false;
        },
      });
    } else {
      this.orderForm.markAsDirty();
    }
  }
}
