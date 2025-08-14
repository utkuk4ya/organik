import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, of, switchMap } from 'rxjs';

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
  private BASE_URL = 'http://13.69.136.67:1091';
  private BEARER_TOKEN = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2IiwidHlwIjoiSldUIn0.eyJqdGkiOiI4ZTU4Mzg4NS02YzQ2LTQ0ZWMtOTY3ZS1iNzg0MDhkY2UzZDUiLCJLdWxBZGkiOiJ0ZXN0IiwibmFtZSI6InRlc3QiLCJLdWxJZCI6IjQiLCJLdXJ1bUlkIjoiMSIsInR5cCI6IjIiLCJJa2lmYWt0b3JsdWRvZ3J1bGFtYSI6IjEiLCJDYXJpSWQiOiIwIiwiUm9sZXMiOlsiT1JHQU5JS19FTlRFR1JBU1lPTiIsIk9SR0FOSUtfRU5URUdSQVNZT05fQUJPTkUiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0VOREVLUyIsIk9SR0FOSUtfRU5URUdSQVNZT05fQ0lIQVoiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0ZBVFVSQSJdLCJuYmYiOjE3NTUxNTc1OTUsImV4cCI6MTc1NTI0Mzk5NSwiaXNzIjoib3JnYW5payIsImF1ZCI6Im9yZ2FuaWsifQ.zd5OzXADFvaL2PwasXdE38JN-rtoDlOW_9yNcXi5TMIC0aaAn6h1QFhdJ7InNLA7nS8-vj4Vz71ipXeztXalc2npbb5VK-jRVFLYnzDu0fHX74auNJ2iYCR3ICunzbV8TIg2xRCUGMkHVVfgFli_HBQ5lheRDM7OPtQt6PDNdtupHvWlyV2mjqWnhseteOQOF6ulvDcDNfypYTUzKBqpAUlCGJfVUarQc_Rtbal1bHnmZrS7dvrU6pG35xwWobxmcwoOQLj17dJktEoezihpvMBWd3fmZwhDHIbXXCC7KOsp5EECAFKG2i5UhtIH66Nfk6ISdBiJ5CxisqjQc7v1Ow';

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

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.BEARER_TOKEN}`
  });

  constructor(private http: HttpClient) {}

  /** Önce SU altında dener, 404 olursa ELK altına düşer */
  getMeters(
    type: 'elk' | 'su' | 'gaz',
    overrides: Partial<typeof this.DEFAULT_BODY> = {},
    useGet = false // true yaparsan GET ile dener
  ): Observable<Sayac[]> {
    const body = { ...this.DEFAULT_BODY, ...overrides };

    const SU_PATHS: Record<'elk' | 'su' | 'gaz', string> = {
      elk: '/api/cihaz/su/listelksayac',
      su:  '/api/cihaz/su/listsusayac',
      gaz: '/api/cihaz/su/listgazsayac',
    };

    const ELK_PATHS: Record<'elk' | 'su' | 'gaz', string> = {
      elk: '/api/cihaz/elk/listelksayac', // <— Fallback
      su:  '/api/cihaz/su/listsusayac',
      gaz: '/api/cihaz/gaz/listgazsayac',
    };

    const firstUrl  = this.BASE_URL + SU_PATHS[type];
    const secondUrl = this.BASE_URL + ELK_PATHS[type];

    console.log('[SayacService] trying:', firstUrl);

    const request = (url: string) =>
      useGet
        ? this.http.get<any>(url, { headers: this.headers })
        : this.http.post<any>(url, body, { headers: this.headers });

    return request(firstUrl).pipe(
      catchError((err: HttpErrorResponse) => {
        // sadece 404 ise fallback yap
        if (err.status === 404) {
          console.warn('[SayacService] 404, fallback to:', secondUrl);
          return request(secondUrl);
        }
        // başka hata ise aynen fırlat
        throw err;
      }),
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