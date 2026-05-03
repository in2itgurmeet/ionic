import { Injectable, signal } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DefultUsageService {
  greeting: string;
  bookingMode = signal<'FTL' | 'PTL'>(
    (localStorage.getItem('bookingMode') as 'FTL' | 'PTL') || 'FTL'
  );
  orderData: any = {};
   isLoggedIn = signal(!!localStorage.getItem('token'));

  constructor(    private toastController: ToastController
) {
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




    async successToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'top',
      color: 'success',
      icon: 'checkmark-circle'
    });

    await toast.present();
  }

  async errorToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'top',
      color: 'danger',
      icon: 'close-circle'
    });

    await toast.present();
  }





  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
  }
}
