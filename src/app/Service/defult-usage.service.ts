import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DefultUsageService {
  greeting: string;
  bookingMode = signal<'FTL' | 'PTL'>(
    (localStorage.getItem('bookingMode') as 'FTL' | 'PTL') || 'FTL'
  );
  orderData: any = {};

  constructor() {
    const now = new Date();
    const currentHour = now.getHours();
    if (currentHour < 12) {
      this.greeting = 'Good morning';
    } else if (currentHour < 18) {
      this.greeting = 'Good afternoon';
    } else if (currentHour < 21) {
      this.greeting = 'Good evening';
    } else {
      this.greeting = 'Good night';
    }
  }

  vehicles = [
    { name: 'Tata Ace', capacity: '780kg', dimensions: '7FT X 4.5FT X 6FT', img: '../../../assets/icon/Select_vichle.png' },
    { name: '20FT Eicher', capacity: '780kg', dimensions: '10FT X 4.5FT X 6FT', img: '../../../assets/icon/Select_vichle.png' },
    { name: 'Tata Ace', capacity: '780kg', dimensions: '7FT X 4.5FT X 6FT', img: '../../../assets/icon/Select_vichle.png' },
  ];

  setOrderData(data: any) {
    this.orderData = { ...this.orderData, ...data };
  }

  getOrderData() {
    return this.orderData;
  }

  clearOrderData() {
    this.orderData = {};
  }

}
