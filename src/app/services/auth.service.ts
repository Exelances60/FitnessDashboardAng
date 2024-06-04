import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { JwtServicesService } from './jwt-services.service';
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
    private userService: UserService
  ) {}

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(environment.apiUrl + '/auth/login', {
        email,
        password,
      })
      .pipe(
        map((response) => {
          const decodeToken = this.jwtService.decodeToken(
            response.token
          ) as TokenPayload;
          const maxAge = new Date(decodeToken.exp * 1000);
          this.cookies.set(
            'token',
            response.token,
            maxAge,
            '/',
            '',
            false,
            'Strict'
          );
          this.userService.getUserInfo().subscribe();
        })
      );
  }
}
