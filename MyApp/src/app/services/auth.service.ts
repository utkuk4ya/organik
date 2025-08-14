// src/app/services/auth.service.ts (veya core/auth.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../core/config'; // yolunuzu proje yapınıza göre düzeltin
import { Observable, of, throwError, map, tap, catchError } from 'rxjs';

type Json = Record<string, any>;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem(API_CONFIG.TOKEN_STORAGE_KEY);
    if (saved) this.token = saved;
  }

  getToken(): string | null {
    return this.token;
  }

  private setToken(tok: string | null) {
    this.token = tok;
    if (tok) localStorage.setItem(API_CONFIG.TOKEN_STORAGE_KEY, tok);
    else localStorage.removeItem(API_CONFIG.TOKEN_STORAGE_KEY);
  }

  login(): Observable<string> {
    const url = API_CONFIG.BASE_URL + API_CONFIG.LOGIN_PATH;
    const body = { kulAdi: API_CONFIG.USERNAME, parola: API_CONFIG.PASSWORD };

    return this.http.post<Json>(url, body).pipe(
      map((res: Json) => {
        const tok =
          res['token'] ||
          res['accessToken'] ||
          res['jwt'] ||
          (res['data'] ? res['data']['token'] : undefined) ||
          res['Value'] ||
          res['value'];

        if (!tok || typeof tok !== 'string') {
          throw new Error('Token alanı bulunamadı. /login cevabını kontrol edin.');
        }
        return tok;
      }),
      tap(tok => this.setToken(tok))
    );
  }

  logout() {
    this.setToken(null);
  }

  ensureToken$(): Observable<string> {
    if (this.token) return of(this.token);
    return this.login();
  }

  reloginFor401$(): Observable<string> {
    return this.login().pipe(
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }
}