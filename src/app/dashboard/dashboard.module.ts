import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LayoutModule } from '../layout/layout.module';
import { ProductsComponent } from './products/products.component';
import { RouterOutlet } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ProductsTableComponent } from './products/products-table/products-table.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    ProductsComponent,
    ProductsTableComponent,
  ],
  imports: [
    RouterOutlet,
    CommonModule,
    DashboardRoutingModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    LayoutModule,
    NzTableModule,
    NzPaginationModule,
    SharedModule,
  ],
})
export class DashboardModule {}
