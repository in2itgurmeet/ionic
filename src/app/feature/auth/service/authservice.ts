import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginUser(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, data, { observe: 'response' })
  }

  forgetPassWord(email:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/forgot-password`, email);
  }

  verifyOtp(data:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/verify-otp`, data);
  }

  resetPassword(data:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/reset-password`, data);
  }
}
