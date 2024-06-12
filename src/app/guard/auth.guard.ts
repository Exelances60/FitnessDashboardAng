import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtServicesService } from '../services/jwt-services.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const cookies = inject(CookieService);
  const jwtServices = inject(JwtServicesService);
  const messageService = inject(NzMessageService);
  const token = cookies.get('token');

  return jwtServices.verifyToken(token).pipe(
    map((response) => {
      if (state.url === '/auth/signin' && response) {
        messageService.success('You are logged in');
        return router.createUrlTree(['/dashboard']);
      }
      messageService.success('You are logged in');
      return true;
    }),
    catchError((error) => {
      messageService.error(error.error.errorMessage || 'You are not logged in');
      cookies.delete('token');
      return of(router.createUrlTree(['/auth/signin']));
    })
  );
};
