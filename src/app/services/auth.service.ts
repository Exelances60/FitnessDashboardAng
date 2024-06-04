import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { JwtServicesService } from './jwt-services.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

interface LoginResponse {
  token: string;
  message: string;
}
interface TokenPayload {
  email: string;
  exp: number;
  iat: number;
  ownerId: string;
  _id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private jwtService: JwtServicesService,
    private router: Router,
    private userService: UserService
  ) {}

  setToken(token: string) {
    const decodeToken = this.jwtService.decodeToken(token) as TokenPayload;
    const maxAge = new Date(decodeToken.exp * 1000);
    this.cookies.set('token', token, maxAge, '/', '', false, 'Strict');
  }

  logout() {
    const cookieOptions = {
      path: '/',
      domain: '',
    };
    this.cookies.delete('token', cookieOptions.path, cookieOptions.domain);
    this.userService.$user.next(null);
    this.router.navigate(['/auth/signin']);
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(environment.apiUrl + '/auth/login', {
        email,
        password,
      })
      .pipe(
        map((response) => {
          this.setToken(response.token);
          this.userService.getUserInfo().subscribe({
            error: (error) => {
              this.logout();
            },
          });
        }),
        catchError((error) => {
          throw error;
        })
      );
  }
}
