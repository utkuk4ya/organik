// src/app/services/aboneler.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, of, catchError, switchMap } from 'rxjs';

import { API_CONFIG } from '../core/config';        // <-- kendi yoluna göre düzelt
import { AuthService } from '../services/auth.service'; // <-- kendi yoluna göre düzelt

export interface Abone {
  id: number;
  cariad?: string;
  aboneno?: string;
  serino?: string;
  tanim?: string;
  aboneliktipad: string;
  faturatipad: string;
  durumad?: string;
}

@Injectable({ providedIn: 'root' })
export class AbonelerService {
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
    durumid: 1,
  };

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  /**
   * type: 'elk' | 'su' | 'gaz'
   * Backend path şeması:
   *  - elk: /api/abone/elk/listabone
   *  - su : /api/abone/su/listsuabone
   *  - gaz: /api/abone/gaz/listgazabone
   */
  getSubscribers(
    type: 'elk' | 'su' | 'gaz',
    overrides: Partial<typeof this.DEFAULT_BODY> = {}
  ): Observable<Abone[]> {
    const body = { ...this.DEFAULT_BODY, ...overrides };

    // su ve gaz'da "list{type}abone" formu, elk'te "listabone"
    const dataPath =
      type === 'elk'
        ? `/api/abone/${type}/listabone`
        : `/api/abone/${type}/list${type}abone`;

    const url = API_CONFIG.BASE_URL + dataPath;

    // Token yoksa login ol; varsa direkt isteği yap.
    // Authorization header'ını zaten AuthInterceptor ekleyecek.
    return this.auth.ensureToken$().pipe(
      switchMap(() => this.http.post<any>(url, body)),
      map((res: Record<string, any>) =>
        Array.isArray(res?.['value']) ? (res['value'] as Abone[]) : []
      ),
      catchError((err: HttpErrorResponse) => {
        console.error('[AbonelerService] liste alınamadı:', err);
        return of([]);
      })
    );
  }
}