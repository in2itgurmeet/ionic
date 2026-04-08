import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  apiUrl = "http://localhost:3000";
  loactionKey: any = "a4cedbc1449f4e90bbd10ea557340c3d"
  constructor(private http: HttpClient) { }

  getOrdersData(): Observable<any> {
    return this.http.get(this.apiUrl + "/orders");
  }
  updateStatus(id: number, status: string) {
    return this.http.patch(`${this.apiUrl}/orders/${id}`, {
      status: status
    });
  }
  searchLocation(query: string) {
    return this.http.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${this.loactionKey}`
    );
  }
  getBookingData(): Observable<any> {
    return this.http.get(this.apiUrl + "/booking");
  }
  createBookingData(data: any): Observable<any> {
    return this.http.post(this.apiUrl + "/booking", data);
  }
  getInvoiceData(): Observable<any> {
    return this.http.get(this.apiUrl + "/invoices-details");
  }
}
