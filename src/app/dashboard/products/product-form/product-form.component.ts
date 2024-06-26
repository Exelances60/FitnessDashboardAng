import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { UserService } from '../../../services/user.service';
import { ProductService } from '../../../services/product.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Product } from '../../../interfaces/product-interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  @Input() product!: Product;
  productForm: FormGroup;
  categories: string[] = [];
  editor: Editor = new Editor();
  loading = false;
  imageList: { fileUrl: string; file: File }[] = [];

  autoTip: Record<string, Record<string, string>> = {
    en: {
      required: 'This field is required',
      minlength: 'This field must be at least 5 characters',
    },
  };

  autoTipName: Record<string, Record<string, string>> = {
    en: {
      required: 'The product name is required',
      minlength: 'The category must be at least 5 characters',
    },
  };
  autoTipDescription: Record<string, Record<string, string>> = {
    en: {
      required: 'The description is required',
      minlength: 'The description must be at least 10 characters',
    },
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private productService: ProductService,
    private messageService: NzMessageService
  ) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.userService.$user.subscribe((user) => {
      this.categories = user?.productCategory || [];
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.product) {
      this.productForm.patchValue({
        productName: this.product.name,
        description: this.product.description,
        price: this.product.price,
        amount: this.product.amount,
        category: this.product.category,
      });
      this.imageList = [
        { fileUrl: this.product.imageUrl, file: undefined as any },
      ];
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit(): void {
    this.loading = true;
    if (this.productForm.valid) {
      const image = this.imageList[0]?.file;
      this.productService
        .addProductWithImage(
          {
            ...this.productForm.value,
            price: this.productForm.value.price.replace(/,/g, ''),
          },
          image
        )
        .subscribe({
          complete: () => {
            this.productForm.reset();
            this.imageList = [];
            this.loading = false;
            this.messageService.success('Product added successfully');
          },
          error: (error) => {
            this.messageService.error(error.error.message);
            this.loading = false;
          },
        });
    } else {
      this.productForm.markAsDirty();
      this.loading = false;
    }
  }

  onUpdateProduct(): void {
    this.loading = true;
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.value.productName);
      formData.append('description', this.productForm.value.description);
      formData.append('price', this.productForm.value.price.replace(/,/g, ''));
      formData.append('amount', this.productForm.value.amount);
      formData.append('category', this.productForm.value.category);
      if (this.imageList[0]?.file) {
        formData.append('image', this.imageList[0].file);
      }
      this.productService.updateProduct(formData, this.product?._id).subscribe({
        complete: () => {
          this.loading = false;
          this.messageService.success('Product updated successfully');
        },
        error: (error) => {
          this.messageService.error(error.error.errorMessage);
          this.loading = false;
        },
      });
    } else {
      this.productForm.markAllAsTouched();
      this.loading = false;
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
    this.productForm.patchValue({
      [key]: value.toString(),
    });
  }
}
