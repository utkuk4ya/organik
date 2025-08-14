// token.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token: string | null = null;

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Eğer token yoksa login ol
    if (!this.token) {
      return this.authService.login().pipe(
        switchMap(token => {
          this.token = token;
          const authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${this.token}` }
          });
          return next.handle(authReq);
        })
      );
    }

    // Token varsa direkt header’a ekle
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${this.token}` }
    });
    return next.handle(authReq);
  }
}
