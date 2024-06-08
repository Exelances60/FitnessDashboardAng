import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Input() customFooter = false;
  @Input() handleOk: () => void = () => {};
  @Output() handleCancel: EventEmitter<void> = new EventEmitter<void>();

  closeModal() {
    this.handleCancel.emit();
  }
}
