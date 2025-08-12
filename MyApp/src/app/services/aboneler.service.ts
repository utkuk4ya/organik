import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ElektrikAbone {
  id: number;
  ad?: string;
  aboneno?: string;
  serino?: string;
  tanim?: string; // <-- eklendi
}

@Injectable({ providedIn: 'root' })
export class AbonelerService {
  private BASE_URL = 'http://13.69.136.67:1091';
  private DATA_PATH = '/api/abone/elk/listabone';

  // mjs dosyandaki bearer token — test amaçlı burada duruyor
  // gerçek sistemde login API'sinden dinamik alınmalı
  private BEARER_TOKEN = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2IiwidHlwIjoiSldUIn0.eyJqdGkiOiI3ZDFlNzlmYS02ZTQzLTRiNWUtOTM3OS00ZWNkNzUzNzE5NWYiLCJLdWxBZGkiOiJ0ZXN0IiwibmFtZSI6InRlc3QiLCJLdWxJZCI6IjQiLCJLdXJ1bUlkIjoiMSIsInR5cCI6IjIiLCJJa2lmYWt0b3JsdWRvZ3J1bGFtYSI6IjEiLCJDYXJpSWQiOiIwIiwiUm9sZXMiOlsiT1JHQU5JS19FTlRFR1JBU1lPTiIsIk9SR0FOSUtfRU5URUdSQVNZT05fQUJPTkUiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0VOREVLUyIsIk9SR0FOSUtfRU5URUdSQVNZT05fQ0lIQVoiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0ZBVFVSQSJdLCJuYmYiOjE3NTQ5ODYyMjksImV4cCI6MTc1NTA3MjYyOSwiaXNzIjoib3JnYW5payIsImF1ZCI6Im9yZ2FuaWsifQ.lSfufeNj_2lFCPUSLAhfU82oKJXvk76BZDXqq2drCLm9I4XZwJHTiYLO4di1jv-JmYfICGYpUw0tYnOMkgYD6svRqC1L_ZuPWJGG5hS1aSQWtIsSDQ6XOXOigsr7Ypj5_Pys2EzQG_-f6gEegC3SAamjUNuatLwWCXLe--2fqziyRP_IeHT3r6TLrhref-k03_p_dbFD99ubFZvDh58DhlmSXvOei7DbiEt6PT2i2U-Knph9LS2Ss6XcyKMS5vVMXqI6f5lWxAElQ9DHdC41MVKHwmwZojw2ADbZ0BupgBI33r_vJ-YgTlvhBtcYII2tVhhjUvdq8Yjx6dAYPGmdxw';

  private DATA_BODY = {
    orderBy: 'd.Id',
    order: 'desc',
    paging: true,
    sortmode: false,
    sort: [
      { orderBy: 'd.Id', order: 'desc' },
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

  constructor(private http: HttpClient) {}

  getElektrikAboneleri(): Observable<ElektrikAbone[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.BEARER_TOKEN}`
    });

    return this.http.post<any>(this.BASE_URL + this.DATA_PATH, this.DATA_BODY, { headers }).pipe(
      map(res => Array.isArray(res?.value) ? res.value : [])
    );
  }
}