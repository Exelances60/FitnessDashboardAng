import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: string = '';
  @Input() icon: string = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() size: 'default' | 'small' | 'large' = 'default';
  @Input() ghost = false;
  @Input() danger = false;
  @Input() onClick: () => void = () => {};
}
