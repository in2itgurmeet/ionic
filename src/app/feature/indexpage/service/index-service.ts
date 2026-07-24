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
    return this.http.get(`${environment.apiUrl}/order/my/all`, { observe: 'response' });
  }
  updateOrderStatus(id: any, status: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/order/status/${id}`, { status }, { observe: 'response' });
  }

  getInvoiceList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/invoice/list`, { observe: 'response' });
  }

  getInvoiceByNo(invoiceNo: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/invoice/${invoiceNo}`, { observe: 'response' });
  }

  getLorryReceipt(lrNo: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/lorry-receipt/${lrNo}`, { observe: 'response' });
  }

  getShippingLabel(docketNo: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/shipping-label/${docketNo}`, { observe: 'response' });
  }

  getProofDelivery(orderId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/proof-delivery/${orderId}`, { observe: 'response' });
  }

  getVehicles(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/vehicles`);
  }

  getConsignorProfile(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/profile`);
  }

  updateConsignorProfile(data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/auth/profile`, data);
  }

  uploadConsignorProfileImage(formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/auth/profile-image`, formData);
  }

  shareLorryReceipt(email: string, pdfBase64: string, lrNo: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/lorry-receipt/share`, { email, pdfBase64, lrNo });
  }

}
