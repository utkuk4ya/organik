// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'http://13.69.136.67:1091';

  constructor(private http: HttpClient) {}

  // Login isteği — backend’in istediği kullanıcı adı/şifreyi yaz
  login(): Observable<string> {
    return this.http.post<any>(`${this.BASE_URL}/login`, {
      kulAdi: 'test',
      parola: '1234'
    }).pipe(
      map(res => res?.token || '') // token alanını backend’e göre düzenle
    );
  }
}
