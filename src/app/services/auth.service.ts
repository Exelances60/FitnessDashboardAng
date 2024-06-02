import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

interface LoginResponse {
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(environment.apiUrl + '/auth/login', {
        email,
        password,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
