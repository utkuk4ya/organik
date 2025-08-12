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
  private BEARER_TOKEN = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2IiwidHlwIjoiSldUIn0.eyJqdGkiOiI1ZmNjMTk2Yy1jYjA4LTQ1ZmYtOWQxNi0yY2NkZGIzOTQyODMiLCJLdWxBZGkiOiJ0ZXN0IiwibmFtZSI6InRlc3QiLCJLdWxJZCI6IjQiLCJLdXJ1bUlkIjoiMSIsInR5cCI6IjIiLCJJa2lmYWt0b3JsdWRvZ3J1bGFtYSI6IjEiLCJDYXJpSWQiOiIwIiwiUm9sZXMiOlsiT1JHQU5JS19FTlRFR1JBU1lPTiIsIk9SR0FOSUtfRU5URUdSQVNZT05fQUJPTkUiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0VOREVLUyIsIk9SR0FOSUtfRU5URUdSQVNZT05fQ0lIQVoiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0ZBVFVSQSJdLCJuYmYiOjE3NTQ5OTQ3OTQsImV4cCI6MTc1NTA4MTE5NCwiaXNzIjoib3JnYW5payIsImF1ZCI6Im9yZ2FuaWsifQ.N3nkiG23MQS7ZlnDgdvinGcOMg-ogcL_h_Zf5p9mrIDHic9cRBGTdcRVmRkGO3cdbpKlenaOl1x1MXlTj14L-DCDcwpanKbb-zqdRitoUBSeMAktx50RsYp9HGfOwgWIq1cKtV_HIFO58hf0_is5UZCgpj6qD2Z38dozZgqjEED0YC4zzAt5dhwpD904tIK4PWjYATHIxDnPHKX0ts3GhabOsQHg8_v0lliH_RrzHg68kSKDS2sTi4L8CKZYgpFizNFGnuW91zUwQ5S4lj5rOIyFIF4bdJf5dxLn7xA4fc7Ngik2gGt22I2UtQPh6D7rM7frkdu0d_As6VndlV3xAQ';

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