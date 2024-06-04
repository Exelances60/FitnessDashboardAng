import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { OwnerResponse, UserInfoResponse } from '../interfaces/user-interface';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  $user = new BehaviorSubject<OwnerResponse | null>(null);

  constructor(
    private http: HttpClient,
    private nzMessageService: NzMessageService
  ) {}

  getUserInfo() {
    return this.http
      .get<UserInfoResponse>(`${environment.apiUrl}/auth/ownerInfo`)
      .pipe(
        map((response) => {
          this.$user.next(response.owner);
          return response;
        }),
        catchError((error) => {
          this.nzMessageService.error(
            error.error.errorMessage || 'An error occurred'
          );
          throw error;
        })
      );
  }
}
