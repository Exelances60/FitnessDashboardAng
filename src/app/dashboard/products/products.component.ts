import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product-interface';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  modalVisible = false;
  loading = false;
  datas = [] as Product[];

  constructor(
    private productService: ProductService,
    private messageService: NzMessageService
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.datas = products;
      },
      complete: () => {
        this.loading = false;
      },
      error: (error) => {
        this.messageService.error(error.error.errorMessage);
        this.loading = false;
      },
    });
  }
  onButtonClick() {
    console.log('Button clicked');
  }
  showModal() {
    this.modalVisible = true;
  }
  closeModal() {
    this.modalVisible = false;
  }
}
