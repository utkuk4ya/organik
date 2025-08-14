// src/app/core/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, switchMap, throwError, catchError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Token’i varsa ekleyip gönder
    const token = this.auth.getToken();
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // 401 ise: bir defaya mahsus yeniden login ve isteği retry et
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          return this.auth.reloginFor401$().pipe(
            switchMap(newToken => {
              this.isRefreshing = false;
              const retried = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
              return next.handle(retried);
            }),
            catchError(err => {
              this.isRefreshing = false;
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}