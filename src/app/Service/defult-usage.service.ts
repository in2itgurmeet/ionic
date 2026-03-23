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








  ///
}
