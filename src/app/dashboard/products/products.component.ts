import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product-interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  modalVisible = false;
  loading = false;
  datas = [] as Product[];

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.datas = products;
      },
      complete: () => {
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
    console.log('Modal closed');
    this.modalVisible = false;
  }
}
