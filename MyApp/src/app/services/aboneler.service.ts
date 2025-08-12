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
  private BEARER_TOKEN = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2IiwidHlwIjoiSldUIn0.eyJqdGkiOiIwYTgwNmUwMi01NGZhLTQ4YzQtODgzNS0yZDUxOWJjMzA0OGEiLCJLdWxBZGkiOiJ0ZXN0IiwibmFtZSI6InRlc3QiLCJLdWxJZCI6IjQiLCJLdXJ1bUlkIjoiMSIsInR5cCI6IjIiLCJJa2lmYWt0b3JsdWRvZ3J1bGFtYSI6IjEiLCJDYXJpSWQiOiIwIiwiUm9sZXMiOlsiT1JHQU5JS19FTlRFR1JBU1lPTiIsIk9SR0FOSUtfRU5URUdSQVNZT05fQUJPTkUiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0VOREVLUyIsIk9SR0FOSUtfRU5URUdSQVNZT05fQ0lIQVoiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0ZBVFVSQSJdLCJuYmYiOjE3NTUwMDIyNDgsImV4cCI6MTc1NTA4ODY0OCwiaXNzIjoib3JnYW5payIsImF1ZCI6Im9yZ2FuaWsifQ.TJOjxij7FYSfdVOhydu-SsQUdK2yYHHDjqzkiEamGv6WV-RaFHoY8h4-ZzimzDgNChUWDdQ9zginalss0CUWCKtyj9l5f_wxLVRKYY-h7C7kaBvjVdU_3lv15zxRAgHGY-tcWeNwmkeYUiZt4THYVZNveGd5UTnebSz6WgUOHpmAowaqaQgEaCVGe8UsC7LdEmN-PQZwHDHLuc-zcJqwhURzBDYptH70G47o5vgKWpk5E8Q6WpW0ppH9o63yF1ImChY-y2udiWVih1vwPhLXMuzR89dqPNz9Pl1W_yoTKzQv8wCwnoK-8XMcMHak-bZQrgj33RCIhtbEScKFHitxMQ';



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

    let dataPath: string = type == "elk" ? `/api/abone/${type}/listabone` : `/api/abone/${type}/list${type}abone`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.BEARER_TOKEN}`
    });

    return this.http.post<any>(this.BASE_URL + dataPath, this.DATA_BODY, { headers }).pipe(
      map(res => Array.isArray(res?.value) ? res.value : [])
    );
  }
}