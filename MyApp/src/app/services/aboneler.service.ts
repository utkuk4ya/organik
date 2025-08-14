/*import { Injectable } from '@angular/core';
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
  private BEARER_TOKEN = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2IiwidHlwIjoiSldUIn0.eyJqdGkiOiI3MjkxZTlhYS0wYjVjLTRmNjMtOWI4NC00YmNjNWRkMmExZDUiLCJLdWxBZGkiOiJ0ZXN0IiwibmFtZSI6InRlc3QiLCJLdWxJZCI6IjQiLCJLdXJ1bUlkIjoiMSIsInR5cCI6IjIiLCJJa2lmYWt0b3JsdWRvZ3J1bGFtYSI6IjEiLCJDYXJpSWQiOiIwIiwiUm9sZXMiOlsiT1JHQU5JS19FTlRFR1JBU1lPTiIsIk9SR0FOSUtfRU5URUdSQVNZT05fQUJPTkUiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0VOREVLUyIsIk9SR0FOSUtfRU5URUdSQVNZT05fQ0lIQVoiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0ZBVFVSQSJdLCJuYmYiOjE3NTUxNTIzMDcsImV4cCI6MTc1NTIzODcwNywiaXNzIjoib3JnYW5payIsImF1ZCI6Im9yZ2FuaWsifQ.rwFlXbnOYISnpKMeE07Z60rmVH89cYpKWIKVxlDyMCCnlg_P3zDH_NklY5A0llZ9jpGWVGLilJ23XECKIKQM_Y2BRcBW7oWIzbheaKfk0Wu-KmlYbwOSxlvLsLYh58olkrvkTooQx-0yDG55UKFB2GW6L5718rmeN4hJyUr_ECNQIUeYVqL649S_O3fvysOsLTqn0b_02S9hXsVuS602Br5Vd-thi2coIbwudYx0i7RlYJXtDbT2PncOveGbBJtnZHg5VkmqErt8u6ZzpSbxbul7n48qNZddlxNCnhpJ28dHdS9rDSqAmDBaTjavY69LFdEoybfQ7oY93PL3M8h2Sw';
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
 
}*/

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
  private BEARER_TOKEN = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2IiwidHlwIjoiSldUIn0.eyJqdGkiOiIyZWFhZjFlMy0wYjQxLTQxNDEtODNlNC05MzU1YzEwYmNlM2QiLCJLdWxBZGkiOiJ0ZXN0IiwibmFtZSI6InRlc3QiLCJLdWxJZCI6IjQiLCJLdXJ1bUlkIjoiMSIsInR5cCI6IjIiLCJJa2lmYWt0b3JsdWRvZ3J1bGFtYSI6IjEiLCJDYXJpSWQiOiIwIiwiUm9sZXMiOlsiT1JHQU5JS19FTlRFR1JBU1lPTiIsIk9SR0FOSUtfRU5URUdSQVNZT05fQUJPTkUiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0VOREVLUyIsIk9SR0FOSUtfRU5URUdSQVNZT05fQ0lIQVoiLCJPUkdBTklLX0VOVEVHUkFTWU9OX0ZBVFVSQSJdLCJuYmYiOjE3NTUxNTAzOTIsImV4cCI6MTc1NTIzNjc5MiwiaXNzIjoib3JnYW5payIsImF1ZCI6Im9yZ2FuaWsifQ.COeX2r0CBEHriRYxak6Rkwmuhy507Pfu54RVZgEj71wDfVyHF9IfNwW0CXVfMEuYyuSRgAur0tmJwxhJLOY-MSAaxcfmhFNJbFJowLBYW8hOVSsOPbyld8zbqvpflYEIYHw0oA4fdsjOocJSXhXe5YcLP9-9uWgFScd_hr8ghjUn6_8HM4_LEYOcZvz01LoO0OnVewDIWwcrAalZnP3myyaeKAsN7wi6P42fjRUpqmlF9n7dQqYODmmSJuugKXkjvHg5MNx6vHjILUDLjC3CnTfqiNqECRpPZNEdll832KwUkuuL8pvSNJMjQpxzIJ7ymm0WD292BHR_UYO6UxyT4Q';



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