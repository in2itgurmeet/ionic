import { routes } from '../../app.routes';
import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from 'src/app/Service/api';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class bookinComponent {

  pickupResults: any[] = [];
  deliveryResults: any[] = [];
  selectedPickup: any = null;
  selectedDelivery: any = null;
  bookingType: any;
  constructor(private api: Api, private routes: Router, private deultService: DefultUsageService) {

  }
  searchPickup(event: any) {
    const value = event.target.value;
    if (value.length > 2) {
      this.api.searchLocation(value).subscribe((res: any) => {
        this.pickupResults = res.features;
      });
    } else {
      this.pickupResults = [];
    }
  }
  ngOnInit() {
    this.bookingType = this.deultService.bookingMode();
    console.log(this.bookingType);
    const now = new Date();

    this.day = this.pad(now.getDate());
    this.month = this.months[now.getMonth()];
    this.year = now.getFullYear();

    let hours = now.getHours();
    this.ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    this.hour = this.pad(hours);
    this.minute = this.pad(now.getMinutes());

    this.calendarDate = now.toISOString();

    this.selectedDate = `${this.day} ${this.month} ${this.year}, ${this.hour}:${this.minute} ${this.ampm}`;
  }


  searchDelivery(event: any) {
    const value = event.target.value;
    if (value.length > 2) {
      this.api.searchLocation(value).subscribe((res: any) => {
        this.deliveryResults = res.features;
      });
    } else {
      this.deliveryResults = [];
    }
  }

  selectPickup(item: any) {
    this.selectedPickup = item;
    this.pickupResults = [];
  }

  selectDelivery(item: any) {
    this.selectedDelivery = item;
    this.routes.navigate(['/indexpage/createOrder'], { queryParams: { orderId: item.orderId } });
    this.deliveryResults = [];
  }


  @HostListener('document:click', ['$event'])
  handleClickOutside(event: any) {
    const clickedInside = event.target.closest('.input_feild_section')
      || event.target.closest('.dropdown-list');
    if (!clickedInside) {
      this.pickupResults = [];
      this.deliveryResults = [];
    }
  }

  isOpen = false;

  day: any;
  month: any;
  year: any;

  hour: any = 10;
  minute: any = 30;
  ampm: any = 'AM';

  calendarDate: any;
  selectedDate: any;

  months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  openPicker() {
    this.isOpen = true;
  }

  onDateChange(e: any) {
    const date = new Date(e.detail.value);

    this.day = this.pad(date.getDate());
    this.month = this.months[date.getMonth()];
    this.year = date.getFullYear();
  }

  confirm() {
    this.selectedDate = `${this.day} ${this.month} ${this.year}, ${this.hour}:${this.minute} ${this.ampm}`;
    this.isOpen = false;
  }
  pad(value: any): string {
    return value < 10 ? '0' + value : value.toString();
  }
  onModalDismiss() {
    this.isOpen = false;
  }

}

