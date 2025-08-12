import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Sayac {
  id: number;
  cariad?: string;
  aboneno?: string;
  serino?: string;
  tanim?: string;
  durumad?: string;

  // sayaç tarafına özgü alanlar (API'ne göre düzenleyebilirsin)
  modemserino?: string;
  etsokod?: string;
}

export interface SayacBody {
  orderBy: string;
  order: 'asc' | 'desc';
  paging: boolean;
  sortmode: boolean;
  sort: Array<{ orderBy: string; order: 'asc' | 'desc' }>;
  page: number;
  nextPage: number;
  pageCount: number;
  serino: string;
  aboneno: string;
  tanim: string;
  durumid: number;
  modemserino: string;
  etsokodlist: string[];
}

@Injectable({ providedIn: 'root' })
export class SayacService {
  private BASE_URL = 'http://13.69.136.67:1091';
  private BEARER_TOKEN = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2IiwidHlwIjoiSldUIn0.eyJqdGkiOiIzNmRmNjAwYS03M2EyLTRjYzEtYmM3Zi1iNGRhYzc5YmQ4NzQiLCJLdWxBZGkiOiJ0ZXN0IiwibmFtZSI6InRlc3QiLCJLdWxJZCI6IjQiLCJLdXJ1bUlkIjoiMSIsInR5cCI6IjIiLCJJa2lmYWt0b3JsdWRvZ3J1bGFtYSI6IjEiLCJDYXJpSWQiOiIwIiwiUm9sZXMiOlsiT1JHQU5JS19FTlRFR1JBU1lPTiIsIk9SR0FOSUtfRU5URUdSQVNZT05fQUJPTkUiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0VOREVLUyIsIk9SR0FOSUtfRU5URUdSQVNZT05fQ0lIQVoiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0ZBVFVSQSJdLCJuYmYiOjE3NTUwMDM5MjUsImV4cCI6MTc1NTA5MDMyNSwiaXNzIjoib3JnYW5payIsImF1ZCI6Im9yZ2FuaWsifQ.VugBYMGbYlLBXeiUr55pD0dNVoc-k2YM6zeUonPsIhFrOj5h0wlyl2vLR6Ql044y6KU0K3Eynu5AU73mQOD5a8jwUzSQBsPEN1BdvezWUcji93sVnK3Q9ZZ762FfO72QW1hsFPcw-inxGqd7Nz2VLmwJtRWUbrku71YUWOpV7pqMhI-RkDN19-4axrQgSyE1zXOVIJcwDjFSDphAoWY-NOymjlx8ksovdJvkTltV1R7xpss8pesSUuQ71sXRu9DC7-YZTy8uGobtpkkWh0bka6ZV5i3mokoyveMl6rXDnU7BnLCI_GritZF6ZY6uk5dZZC8jbdMiwCjReMNfHTREuA';

  // Verdiğin body’nin birebir default hali
  private readonly DEFAULT_BODY: SayacBody = {
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
    durumid: 1,
    modemserino: '',
    etsokodlist: ['1111111', '2222222']
  };

  constructor(private http: HttpClient) {}

  /**
   * Elektrik sayaç listesini çeker.
   * @param bodyOverrides DEFAULT_BODY üzerinde değiştirmek istediğin alanlar
   *
   * Örnek:
   * this.sayacService.getElkSayac({ aboneno: '123', etsokodlist: ['9999999'] })
   */
  getElkSayac(bodyOverrides: Partial<SayacBody> = {}): Observable<Sayac[]> {
    const dataPath = `/api/cihaz/elk/listelksayac`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.BEARER_TOKEN}`
    });

    // default body + override edilen alanlar
    const body: SayacBody = {
      ...this.DEFAULT_BODY,
      ...bodyOverrides,
      // nested array/object varsa gerekirse daha ince birleştirme yapılabilir
    };

    return this.http.post<any>(this.BASE_URL + dataPath, body, { headers }).pipe(
      map(res => Array.isArray(res?.value) ? res.value as Sayac[] : [])
    );
  }
}