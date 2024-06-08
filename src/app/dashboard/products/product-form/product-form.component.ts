import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  productForm: FormGroup = this.fb.group({
    productName: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    category: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });
  categories: string[] = [];
  editor: Editor = new Editor();
  loading = false;
  imageList: { fileUrl: string; file: File }[] = [];

  autoTip: Record<string, Record<string, string>> = {
    en: {
      required: 'This field is required',
    },
  };

  autoTipName: Record<string, Record<string, string>> = {
    en: {
      minlength: 'The category must be at least 5 characters',
    },
  };
  autoTipDescription: Record<string, Record<string, string>> = {
    en: {
      minlength: 'The description must be at least 10 characters',
    },
  };

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userService.$user.subscribe((user) => {
      this.categories = user?.productCategory || [];
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit(): void {}
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
