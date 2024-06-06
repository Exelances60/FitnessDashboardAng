import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NzButtonModule],
  exports: [ButtonComponent],
})
export class SharedModule {}
