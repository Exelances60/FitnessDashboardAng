import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { HeaderAvatarComponent } from './header/header-avatar/header-avatar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [HeaderComponent, HeaderAvatarComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzAvatarModule,
    NzSpinModule,
    RouterLink,
    NzDropDownModule,
  ],
  exports: [HeaderComponent, HeaderAvatarComponent],
})
export class LayoutModule {}
