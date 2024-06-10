import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ProductsComponent } from './products/products.component';
import { ProductsTableComponent } from './products/products-table/products-table.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { CurrencyCustomPipe } from '../pipes/currency.pipe';
import { NgxEditorModule } from 'ngx-editor';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { CreateOrderFormComponent } from './products/create-order-form/create-order-form.component';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    ProductsComponent,
    ProductsTableComponent,
    CurrencyCustomPipe,
    ProductFormComponent,
    ProductEditComponent,
    CreateOrderFormComponent,
  ],
  providers: [CurrencyCustomPipe],
  imports: [
    DashboardRoutingModule,
    LayoutModule,
    SharedModule,
    NgxEditorModule,
    SafeHtmlPipe,
  ],
})
export class DashboardModule {}
