import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css',
})
export class DashboardHomeComponent {
  navItems = [
    { name: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
    { name: 'Products', link: '/products', icon: 'shop' },
    { name: 'Orders', link: '/orders', icon: 'shopping-cart' },
  ];

  constructor() {}
}
