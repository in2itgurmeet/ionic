import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class IndexService {
  constructor(private http: HttpClient) { }

  createOrderStep1(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/order/step1`, data, { observe: 'response' });
  }

  createOrderStep2(data: any, id: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/order/step2/${id}`, data, { observe: 'response' });
  }

  payMentProcess(data: any, id: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/order/payment/${id}`, data, { observe: 'response' });
  }


  getOrderById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/order/${id}`, { observe: 'response' });
  }
  getAllOrders():Observable<any>{
    return this.http.get(`${environment.apiUrl}/order/orderlist`, { observe: 'response' });
  }

}
