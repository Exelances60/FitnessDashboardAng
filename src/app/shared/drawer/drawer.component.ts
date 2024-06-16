import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() onClose = () => {};
  @Input() placement = 'right';
  @Output() close = new EventEmitter<void>();
  width = 600;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.width = 550;
        }
      });
    this.breakpointObserver
      .observe(['(max-width: 576px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.width = 360;
        }
      });
  }

  onCloseDrawer(): void {
    this.close.emit();
  }
}
