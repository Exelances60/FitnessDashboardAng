import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { UserService } from '../../../services/user.service';
import { ProductService } from '../../../services/product.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
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

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit(): void {
    this.loading = true;
    if (this.productForm.valid) {
      const image = this.imageList[0]?.file;
      this.productService
        .addProductWithImage(this.productForm.value, image)
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
      this.productForm.markAllAsTouched();
      this.loading = false;
    }
  }
  handleImageUpload(info: any): void {
    if (info.target.files !== this.imageList.map((img) => img.file)) {
      this.imageList = [];
    }
    const files = Array.prototype.slice.call(info.target.files);
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageList.push({ fileUrl: e.target.result, file });
      };
      reader.readAsDataURL(file);
    }
    this.productForm.patchValue({ image: this.imageList });
  }
}
