import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ModalComponent } from './modal/modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TableSearchComponent } from './table-search/table-search.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [ButtonComponent, ModalComponent, TableSearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzButtonModule,
    NzModalModule,
    NzDropDownModule,
    NzIconModule,
    NzInputModule,
  ],
  exports: [ButtonComponent, ModalComponent, TableSearchComponent],
})
export class SharedModule {}
