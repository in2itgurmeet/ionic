import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from 'src/app/Service/api';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';
import { IndexService } from '../service/index-service';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingTypeComponent {
  pickupResults: any[] = [];
  deliveryResults: any[] = [];
  selectedPickup: any = null;
  selectedDelivery: any = null;
  bookingType: any;
  isOpen = false;
  day: any;
  month: any;
  year: any;
  hour: any = 10;
  minute: any = 30;
  ampm: any = 'AM';
  calendarDate: any;
  selectedDate: any;
  booking!: FormGroup;
  constructor(
    private api: Api,
    private routes: Router,
    private deultService: DefultUsageService,
    private indexService: IndexService,
  ) {
    this.booking = new FormGroup({});
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
    this.formInit();
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

  formInit() {
    this.booking = new FormGroup({
      pickup: new FormControl(null, Validators.required),
      delivery: new FormControl(null, Validators.required),
    });
    this.bookingType = this.deultService.bookingMode();
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
    const value = item?.properties?.formatted;
    this.booking.get('pickup')?.setValue(value);
    this.pickupResults = [];
  }

  // selectDelivery(item: any) {
  //   const value = item?.properties?.formatted;
  //   this.booking.get('delivery')?.setValue(value);
  //   if (this.booking.valid) {
  //     let payload = {
  //       ...this.booking.value,
  //       bookingType: this.bookingType,
  //       date: this.selectedDate,
  //     };
  //     this.indexService.createOrderStep1(payload).subscribe({
  //       next: (res: any) => {
  //         this.deultService.successToast(res.message);
  //         localStorage.setItem('ordId', res.orderId);
  //       },
  //       error: (err: any) => {
  //         this.deultService.errorToast(err.error.message || err.message);
  //       },
  //     });
  //   }
  //   this.routes.navigate(['/indexpage/createOrder']);
  //   this.deliveryResults = [];
  // }
  selectDelivery(item: any) {
    const value = item.properties.formatted;

    this.booking.get('delivery')?.setValue(value);

    this.deliveryResults = [];

    if (this.booking.invalid) return;

    const payload = {
      bookingType: this.bookingType,

      pickup: {
        location: this.booking.value.pickup,
        date: `${this.day} ${this.month} ${this.year}`,
        time: `${this.hour}:${this.minute} ${this.ampm}`,
      },

      delivery: {
        location: this.booking.value.delivery,
      },
    };

    console.log(payload);

    this.indexService.createOrderStep1(payload).subscribe({
      next: (res: any) => {
        this.deultService.successToast(res.body.message);
        localStorage.setItem('ordId', res.body.data._id);
        this.routes.navigate(['/indexpage/createOrder']);
      },
      error: (err: any) => {
        this.deultService.errorToast(
          err.error.message || 'Something went wrong'
        );
      },
    });
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: any) {
    const clickedInside =
      event.target.closest('.input_feild_section') ||
      event.target.closest('.dropdown-list');
    if (!clickedInside) {
      this.pickupResults = [];
      this.deliveryResults = [];
    }
  }

  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
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
