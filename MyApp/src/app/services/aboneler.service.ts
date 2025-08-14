import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Abone {
  id: number;
  cariad?: string;
  aboneno?: string;
  serino?: string;
  tanim?: string; // <-- eklendi
  aboneliktipad: string;
  faturatipad: string;
  durumad?: string;
}

@Injectable({ providedIn: 'root' })
export class AbonelerService {
  
  private BASE_URL = 'http://13.69.136.67:1091';

  // mjs dosyandaki bearer token — test amaçlı burada duruyor
  // gerçek sistemde login API'sinden dinamik alınmalı
  private BEARER_TOKEN = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2IiwidHlwIjoiSldUIn0.eyJqdGkiOiIzYWM0YzJkNy04MTFkLTQwNjItODkzZS0xMWJjN2MwYTk5OGEiLCJLdWxBZGkiOiJ0ZXN0IiwibmFtZSI6InRlc3QiLCJLdWxJZCI6IjQiLCJLdXJ1bUlkIjoiMSIsInR5cCI6IjIiLCJJa2lmYWt0b3JsdWRvZ3J1bGFtYSI6IjEiLCJDYXJpSWQiOiIwIiwiUm9sZXMiOlsiT1JHQU5JS19FTlRFR1JBU1lPTiIsIk9SR0FOSUtfRU5URUdSQVNZT05fQUJPTkUiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0VOREVLUyIsIk9SR0FOSUtfRU5URUdSQVNZT05fQ0lIQVoiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0ZBVFVSQSJdLCJuYmYiOjE3NTUwODI5ODgsImV4cCI6MTc1NTE2OTM4OCwiaXNzIjoib3JnYW5payIsImF1ZCI6Im9yZ2FuaWsifQ.eZMLpE9u5iDvXrX1hAJZhr5eZqXT9wxzZ2rD7Wx9n_naMU1zPzZP30PxAH0zykVS5ANR_6UuCZop6rl0erDQWLpDE0W0EUKBT658VBItF6H28xIQOSgJby4tVLxk8XNdWeCnZnS9ubp5f9O96cYuekXODsC_Cq2M056cepNJO-ONjGem7dP77cO3AqI_4EzjFIBqMz0LkSGfwOEb3S7LoKaNB0bKRrp-3-Hh8EMB9CAqlfp18xKl7kq6v3grvrezdgc07UmCQlx5DEV53WmtT33yA2dsimncFDZHsahp3aVT6YemN5yiRMbhjgaAnBVJRD4Is7-M3v_bH60LVrKoDQ';

  private DATA_BODY = {
    orderBy: 'd.Id',
    order: 'desc',
    paging: true,
    sortmode: false,
    sort: [
      { orderBy: 'd.Id', order: 'desc' }
    ],
    page: 1,
    nextPage: 100,
    pageCount: 100,
    serino: '',
    aboneno: '',
    tanim: '',
    durumid: 1
  };

  constructor(private http: HttpClient) { }

  getSubscribers(type: string): Observable<Abone[]> {

    let dataPathAbone: string = type == "elk" ? `/api/abone/${type}/listabone` : `/api/abone/${type}/list${type}abone`;

    //   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.BEARER_TOKEN}`
    });

    return this.http.post<any>(this.BASE_URL + dataPathAbone, this.DATA_BODY, { headers }).pipe(
      map(res => Array.isArray(res?.value) ? res.value : [])
    );
  }

  getSayac(type: string): Observable<Abone[]> {

    let dataPathSayac: string = `/api/cihaz/${type}/listelksayac`;

    //   /api/cihaz/elk/listelksayac
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.BEARER_TOKEN}`
    });

    return this.http.post<any>(this.BASE_URL + dataPathSayac, this.DATA_BODY, { headers }).pipe(
      map(res => Array.isArray(res?.value) ? res.value : [])
    );
  }
 
}