import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, } from '@angular/router';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  formattedDateTime: string | undefined;
  private timer: any;
  constructor(public defultServise: DefultUsageService, private route: Router) {
    this.updateDateTime();
    this.timer = setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  updateDateTime(): void {
    const currentDate = new Date();
    this.formattedDateTime = this.formatDateTime(currentDate);
  }

  formatDateTime(date: Date): string {
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    let seconds: number | string = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    const strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return `${formattedDate} ${strTime}`;
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }



  addModeOfbooking(mode: 'FTL' | 'PTL') {
    this.defultServise.bookingMode.set(mode);
    localStorage.setItem('bookingMode', mode);
    this.route.navigate(['/indexpage/booking']);
  }


  seeAllOrder(event: any) {
    if (event) {
      this.route.navigate(['/indexpage/allproduct']);
    }
  }


  dashbaordData = {
    "message": "Dashboard Data Fetched Successfully",
    "data": {
      "orders": {
        "total": 120,
        "pending": 18,
        "booked": 35,
        "inTransit": 22,
        "completed": 38,
        "cancelled": 7
      },
      "invoice": {
        "totalAmount": 542300,
        "paidAmount": 410000,
        "dueAmount": 102300,
        "overdueAmount": 30000
      },
      "latestTransitOrder": {
        "_id": "662f8ab1234567890abc1234",
        "orderId": "ORD122467269",
        "lrNumber": "LR/2343",
        "referenceNumber": "REF0012",
        "bookingType": "FTL",
        "paymentType": "Prepaid",
        "status": "In Transit",
        "amount": 427300,
        "pickup": {
          "address": "Delhi Red Fort, Delhi",
          "date": "11-Mar-2026",
          "time": "11:00 AM"
        },
        "delivery": {
          "address": "Jaipur Transport Nagar, Rajasthan",
          "date": "12-Mar-2026",
          "time": "06:00 PM"
        },
        "vehicle": {
          "name": "Tata Ace",
          "capacity": "780 KG",
          "dimension": "7FT X 4.5FT X 6FT",
          "vehicleNumber": "DL1LAB1234"
        },
        "driver": {
          "name": "Rohit Kumar",
          "mobile": "9876543210"
        },
        "cargo": {
          "goodsDescription": "Printing Machine - Electronics",
          "quantity": 25,
          "weight": 500,
          "dimension": "20CM X 18CM X 16CM"
        }
      },
      "recentOrders": [
        {
          "orderId": "ORD122467270",
          "status": "Booked",
          "amount": 12000
        },
        {
          "orderId": "ORD122467271",
          "status": "Pending",
          "amount": 9500
        },
        {
          "orderId": "ORD122467272",
          "status": "Completed",
          "amount": 22000
        }
      ],
      "todaySummary": {
        "todayOrders": 8,
        "todayDelivered": 5,
        "todayRevenue": 78500
      }
    }
  }



}
