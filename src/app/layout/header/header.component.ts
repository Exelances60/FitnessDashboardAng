import { Component } from '@angular/core';
import { OwnerResponse } from '../../interfaces/user-interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  ownerInfo!: OwnerResponse | null;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.ownerInfo = this.userService.$user.value;
    if (!this.ownerInfo) {
      this.userService.getUserInfo().subscribe((response) => {
        this.ownerInfo = response.owner;
      });
    }
  }
}
