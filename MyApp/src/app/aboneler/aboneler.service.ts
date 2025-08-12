import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AbonelerService {

    baseUrl = '13.69.136.67:1091';  // API temel URL'n

    constructor(private http: HttpClient) { }

    getSubscribers(type: string): Observable<any> {
        const url = `${this.baseUrl}/api/abone/${type}/listabone`;
        return this.http.get(url);
    }
}
