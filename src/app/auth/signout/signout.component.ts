import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.css',
})
export class SignoutComponent {
  constructor(private cookieService: CookieService, private router: Router) {}

  signout() {
    this.cookieService.delete('token');
    return this.router.navigate(['/auth/signin']);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.signout();
  }
}
