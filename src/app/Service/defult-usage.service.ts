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

  constructor(private toastController: ToastController
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
    {
      name: 'Mahindra Jeeto',
      capacity: '700 kg',
      dimensions: '7 FT X 4.6 FT X 5 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: 'Tata Ace',
      capacity: '780 kg',
      dimensions: '7 FT X 4.9 FT X 5.5 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: 'Ashok Leyland Dost',
      capacity: '1500 kg',
      dimensions: '8.7 FT X 5.3 FT X 6 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: 'Mahindra Supro Maxitruck',
      capacity: '1050 kg',
      dimensions: '8.2 FT X 5 FT X 5.8 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: 'Piaggio Ape Xtra LDX',
      capacity: '500 kg',
      dimensions: '6 FT X 4.5 FT X 5 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: 'Bolero Pickup',
      capacity: '1700 kg',
      dimensions: '8.7 FT X 5.6 FT X 6 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: 'Tata Intra V30',
      capacity: '1300 kg',
      dimensions: '8.8 FT X 5.3 FT X 6 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: 'Tata 407',
      capacity: '2500 kg',
      dimensions: '10 FT X 6 FT X 7 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: 'Eicher Pro 2049',
      capacity: '3500 kg',
      dimensions: '14 FT X 7 FT X 7 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: '14FT Truck',
      capacity: '4000 kg',
      dimensions: '14 FT X 7 FT X 7 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: '17FT Truck',
      capacity: '5000 kg',
      dimensions: '17 FT X 7 FT X 7 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: '20FT Eicher',
      capacity: '6000 kg',
      dimensions: '20 FT X 7.5 FT X 7 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: '22FT Truck',
      capacity: '7000 kg',
      dimensions: '22 FT X 7.5 FT X 7 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: '24FT Truck',
      capacity: '9000 kg',
      dimensions: '24 FT X 7.5 FT X 8 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: '32FT Multi Axle',
      capacity: '14000 kg',
      dimensions: '32 FT X 8 FT X 8 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: '40FT Trailer',
      capacity: '25000 kg',
      dimensions: '40 FT X 8 FT X 8.5 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: 'Container 20FT',
      capacity: '7000 kg',
      dimensions: '20 FT X 8 FT X 8 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: 'Container 32FT',
      capacity: '15000 kg',
      dimensions: '32 FT X 8 FT X 8.5 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: 'Container 40FT',
      capacity: '25000 kg',
      dimensions: '40 FT X 8 FT X 8.5 FT',
      img: '../../../assets/icon/Select_vichle.png'
    },
    {
      name: 'Mini Tempo',
      capacity: '1000 kg',
      dimensions: '8 FT X 5 FT X 6 FT',
      img: '../../../assets/icon/Select_vichle.png'
    }
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
