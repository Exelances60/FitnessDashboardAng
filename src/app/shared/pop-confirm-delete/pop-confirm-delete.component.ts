import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-confirm-delete',
  templateUrl: './pop-confirm-delete.component.html',
  styleUrl: './pop-confirm-delete.component.css',
})
export class PopConfirmDeleteComponent {
  @Input() title = 'Are you sure you want to delete this item?';
  @Input() placement:
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'left'
    | 'leftTop'
    | 'leftBottom'
    | 'right'
    | 'rightTop'
    | 'rightBottom' = 'top';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor() {}

  onConfirm() {
    this.confirm.emit();
  }
  onCancel() {
    this.cancel.emit();
  }
}
