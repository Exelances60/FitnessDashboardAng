import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ProductsComponent } from './products/products.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { productResolver } from '../resolvers/product.resolver';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent,
      },

      {
        path: 'products/edit/:id',
        component: ProductEditComponent,
        resolve: {
          product: productResolver,
        },
      },
      {
        path: 'orders',
        component: OrderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
