import { Component } from '@angular/core';

import { OwnerResponse } from '../../interfaces/user-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  ownerInfo!: OwnerResponse;
  constructor(private route: ActivatedRoute) {
    this.ownerInfo = this.route.snapshot.data['userInfo'];
    this.route.data.subscribe((data) => {
      this.ownerInfo = data['userInfo'];
    });
  }
}
