import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://apiks.orwi.dev';

  constructor(private http: HttpClient) {}

  get(endpoint: string) {
    const res = this.http.get(`${this.apiUrl}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  }

  post(endpoint: string, data: any): Observable<any> {
    const res = this.http.post(`${this.apiUrl}${endpoint}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  }
}
