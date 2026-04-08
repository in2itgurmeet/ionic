import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-Bill',
  imports: [CommonModule, IonicModule],
  templateUrl: './invoice-Bill.component.html',
  styleUrls: ['./invoice-Bill.component.scss'],
})
export class InvoiceBillComponent implements OnInit {
  isPopupOpen: boolean = false;
  constructor() { }

  ngOnInit() { }
  openPopup() {
    this.isPopupOpen = !this.isPopupOpen;
    if (this.isPopupOpen) {
      document.body.classList.add('overlay');
    } else {
      document.body.classList.remove('overlay');
    }
  }
  printPage() {
    window.print();
  }


  invoiceBill = {
    "invoiceId": "INV20260408001",
    "invoiceNo": "INV/24-25/8891",
    "date": "2026-04-08",
    "dueDate": "2026-04-10",
    "paymentType": "TO_PAY",
    "company": {
      "name": "PLC Logistic Pvt Ltd",
      "logo": "assets/icon/logo.jpg",
      "address": "Plot 21, Sector 18, Gurugram, Haryana - 122015",
      "mobile": "+91 9812345678",
      "email": "support@plclogistics.com"
    },
    "customer": {
      "name": "ABC Pvt Ltd",
      "mobile": "+91 9988776655",
      "email": "abc@gmail.com",
      "address": "Bhiwandi Industrial Area, Thane, Maharashtra - 421302"
    },
    "order": {
      "orderId": "ORD123456",
      "lrNo": "LR/24-25/45821",
      "docketNo": "ADWQ321850"
    },
    "charges": {
      "transportation": 3000,
      "loadingUnloading": 1000
    },
    "tax": {
      "sgstPercent": 9,
      "cgstPercent": 9,
      "sgstAmount": 360,
      "cgstAmount": 360
    },
    "total": {
      "gross": 4000,
      "final": 4720,
      "paid": 1000,
      "outstanding": 3720
    },
    "payment": {
      "status": "PARTIAL",
      "method": "Cash",
      "transactionId": "TXN20260408001"
    },
    "notes": "Thank you for doing business with us."
  }


}
