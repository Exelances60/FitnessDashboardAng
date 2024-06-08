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

@NgModule({
  declarations: [
    DashboardHomeComponent,
    ProductsComponent,
    ProductsTableComponent,
    CurrencyCustomPipe,
    ProductFormComponent,
  ],
  imports: [
    DashboardRoutingModule,
    LayoutModule,
    SharedModule,
    NgxEditorModule,
  ],
  providers: [CurrencyCustomPipe],
})
export class DashboardModule {}
