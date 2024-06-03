import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

export const tokenInterceptors = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const cookieServices = inject(CookieService);
  const token = cookieServices.get('token') || '';
  const headers = req.headers.set('Authorization', `Bearer ${token}`);
  const cloneReq = req.clone({
    headers,
  });
  return next(cloneReq);
};
