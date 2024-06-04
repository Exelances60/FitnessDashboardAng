import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { OwnerResponse } from '../interfaces/user-interface';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError, map, Observable, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

export const userResolver: ResolveFn<OwnerResponse | { error: string }> = (
  route: ActivatedRouteSnapshot
): Observable<OwnerResponse | { error: string }> => {
  const userService = inject(UserService);
  const router = inject(Router);
  const messageService = inject(NzMessageService);
  return userService.getUserInfo().pipe(
    map((response) => {
      userService.$user.next(response.owner);
      return response.owner;
    }),
    catchError((error: any) => {
      messageService.error('User info not found');
      router.navigate(['/auth/signin']);
      return of({ error: 'You are not logged in' });
    })
  );
};
