import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface VerifyTokenResponse {
  success: boolean;
  errorMessage?: string;
}

@Injectable({
  providedIn: 'root',
})
export class JwtServicesService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  getSecretKey(): string {
    return environment.jwt_secret;
  }

  decodeToken(
    token: string = this.cookieService.get('token')
  ): Record<string, any> {
    return jwtDecode(token);
  }

  verifyToken(token: string) {
    return this.http.post<VerifyTokenResponse>(
      environment.apiUrl + '/auth/verify',
      { token }
    );
  }
}
