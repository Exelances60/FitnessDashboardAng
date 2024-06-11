import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ModalComponent } from './modal/modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TableSearchComponent } from './table-search/table-search.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { PopConfirmDeleteComponent } from './pop-confirm-delete/pop-confirm-delete.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { DrawerComponent } from './drawer/drawer.component';
import { CardComponent } from './card/card.component';
import { CustomBadgeComponent } from './custom-badge/custom-badge.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ModalComponent,
    TableSearchComponent,
    PopConfirmDeleteComponent,
    DrawerComponent,
    CardComponent,
    CustomBadgeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzButtonModule,
    NzModalModule,
    NzDropDownModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzImageModule,
    NzFormModule,
    NzSelectModule,
    NzUploadModule,
    NzPopconfirmModule,
    NzDrawerModule,
  ],
  exports: [
    ButtonComponent,
    ModalComponent,
    TableSearchComponent,
    CommonModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzTableModule,
    NzDropDownModule,
    NzImageModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzSelectModule,
    NzUploadModule,
    PopConfirmDeleteComponent,
    NzPopconfirmModule,
    DrawerComponent,
    CardComponent,
    CustomBadgeComponent,
  ],
})
export class SharedModule {}
