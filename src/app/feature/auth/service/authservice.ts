import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Authservice {

  constructor(private http: HttpClient) { }

  loginUser(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, data, { observe: 'response' })
  }
}
