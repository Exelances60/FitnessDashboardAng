import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() width = 720;
  @Input() onClose = () => {};
  @Input() placement = 'right';
  @Output() close = new EventEmitter<void>();

  onCloseDrawer(): void {
    this.close.emit();
  }
}
