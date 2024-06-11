import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-badge',
  templateUrl: './custom-badge.component.html',
  styleUrl: './custom-badge.component.css',
})
export class CustomBadgeComponent {
  @Input() status = 'bg-green-500';
}
