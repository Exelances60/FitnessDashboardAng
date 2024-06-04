import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-avatar',
  templateUrl: './header-avatar.component.html',
  styleUrl: './header-avatar.component.css',
})
export class HeaderAvatarComponent {
  @Input() ImageUrl: string | undefined = undefined;

  constructor() {}
}
