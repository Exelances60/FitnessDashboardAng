import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { OwnerResponse, UserInfoResponse } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  $user = new BehaviorSubject<OwnerResponse | null>(null);
  constructor(private http: HttpClient) {}

  getUserInfo() {
    return this.http
      .get<UserInfoResponse>(`${environment.apiUrl}/auth/ownerInfo`)
      .pipe(
        map((response) => {
          this.$user.next(response.owner);
          return response;
        })
      );
  }
}
