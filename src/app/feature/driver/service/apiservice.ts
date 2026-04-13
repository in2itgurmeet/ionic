import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Apiservice {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


  getChartData() {
    return this.http.get(`${this.url}/chartData`);
  }

}
