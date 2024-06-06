import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ModalComponent } from './modal/modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [ButtonComponent, ModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzButtonModule,
    NzModalModule,
  ],
  exports: [ButtonComponent, ModalComponent],
})
export class SharedModule {}
