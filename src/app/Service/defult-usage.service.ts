import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DefultUsageService {
  greeting: string;

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


  // eslint-disable-next-line @angular-eslint/contextual-lifecycle






  vehicles = [
    { name: 'Tata Ace', capacity: '780kg', dimensions: '7FT X 4.5FT X 6FT', img: '../../../assets/icon/Select_vichle.png' },
    { name: '20FT Eicher', capacity: '780kg', dimensions: '10FT X 4.5FT X 6FT', img: '../../../assets/icon/Select_vichle.png' },
    { name: 'Tata Ace', capacity: '780kg', dimensions: '7FT X 4.5FT X 6FT', img: '../../../assets/icon/Select_vichle.png' },
  ];




  ///
}
