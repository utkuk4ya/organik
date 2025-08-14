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

  constructor(private http: HttpClient) { }

  /**
   * Elektrik sayaç listesini çeker.
   * @param bodyOverrides DEFAULT_BODY üzerinde değiştirmek istediğin alanlar
   *
   * Örnek:
   * this.sayacService.getElkSayac({ aboneno: '123', etsokodlist: ['9999999'] })
   */
  getElkSayac(bodyOverrides: Partial<SayacBody> = {}): Observable<Sayac[]> {
    const dataPath = `/api/cihaz//listsayac`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
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