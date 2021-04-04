import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utils } from '../Utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  private headers: HttpHeaders;
  private baseUrl: string;
  private url: string;

  constructor(private http: HttpClient) {
    this.baseUrl = window.location.origin;
    this.headers = new HttpHeaders();
    this.url = 'http://localhost:8080/api/';
  }

  get(prefixUrl: string): Observable<any> {
    this.setHeaders();
    return this.http.get(
      this.url + prefixUrl,
      { headers: this.headers }
    );
  }

  post(prefixUrl: string, params: any = null): Observable<any> {
    this.setHeaders();
    return this.http.post(
      this.url + prefixUrl,
      params,
      { headers: this.headers }
    );
  }

  put(prefixUrl: string, params: any = null): Observable<any> {
    this.setHeaders();
    return this.http.put(
      this.url + prefixUrl,
      params,
      { headers: this.headers }
    );
  }

  delete(prefixUrl: string): Observable<any> {
    this.setHeaders();
    return this.http.delete(
      this.url + prefixUrl,
      { headers: this.headers }
    );
  }

  setHeaders(): void {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('-Requested-With', 'XMLHttpRequest');
  }
}
