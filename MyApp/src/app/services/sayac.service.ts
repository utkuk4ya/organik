// src/app/services/sayac.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { API_CONFIG } from '../core/config';

export interface Sayac {
  id: number;
  cariad?: string;
  aboneno?: string;
  serino?: string;
  modemserino?: string;
  etsokod?: string;
  tanim?: string;
  durumad?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class SayacService {
  private readonly DEFAULT_BODY = {
    orderBy: 'd.Id',
    order: 'desc',
    paging: true,
    sortmode: false,
    sort: [{ orderBy: 'd.Id', order: 'desc' }],
    page: 1,
    nextPage: 100,
    pageCount: 100,
    serino: '',
    aboneno: '',
    tanim: '',
    durumid: 1
  };

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  /** Önce SU altında dener, 404 olursa ELK altına düşer */
  getMeters(
    type: 'elk' | 'su' | 'gaz',
    overrides: Partial<typeof this.DEFAULT_BODY> = {},
    useGet = false
  ): Observable<Sayac[]> {
    const body = { ...this.DEFAULT_BODY, ...overrides };

    const SU_PATHS: Record<'elk' | 'su' | 'gaz', string> = {
      elk: '/api/cihaz/su/listelksayac',
      su:  '/api/cihaz/su/listsusayac',
      gaz: '/api/cihaz/su/listgazsayac',
    };

    const ELK_PATHS: Record<'elk' | 'su' | 'gaz', string> = {
      elk: '/api/cihaz/elk/listelksayac',
      su:  '/api/cihaz/su/listsusayac',
      gaz: '/api/cihaz/gaz/listgazsayac',
    };

    const firstUrl  = API_CONFIG.BASE_URL + SU_PATHS[type];
    const secondUrl = API_CONFIG.BASE_URL + ELK_PATHS[type];

    const request = (url: string) =>
      useGet ? this.http.get<any>(url) : this.http.post<any>(url, body);

    // 1) Token hazır değilse login ol  2) isteği yap  3) 404’te fallback
    return this.auth.ensureToken$().pipe(
      switchMap(() =>
        request(firstUrl).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 404) {
              return request(secondUrl);
            }
            throw err;
          })
        )
      ),
      map(res => (Array.isArray(res?.value) ? (res.value as Sayac[]) : [])),
      catchError(err => {
        console.error('Sayaç listesi alınamadı:', err);
        return of([]);
      })
    );
  }

  getElkSayac(overrides: Partial<typeof this.DEFAULT_BODY> = {}, useGet = false) {
    return this.getMeters('elk', overrides, useGet);
  }
  getSuSayac(overrides: Partial<typeof this.DEFAULT_BODY> = {}, useGet = false) {
    return this.getMeters('su', overrides, useGet);
  }
  getGazSayac(overrides: Partial<typeof this.DEFAULT_BODY> = {}, useGet = false) {
    return this.getMeters('gaz', overrides, useGet);
  }
}