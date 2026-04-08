import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lorry-receipt',
  imports: [IonicModule, CommonModule],
  templateUrl: './lorry-receipt.component.html',
  styleUrls: ['./lorry-receipt.component.scss'],
})
export class LorryReceiptComponent {
  isSecondAccordionOpen: boolean = false;
  isPopupOpen: boolean = false;

  activeTab: number = 1;
  constructor() { }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }


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



  lrData = {
    "cnNo": "CN202604080001",
    "gstNo": "06AABCU9603R1ZV",

    "company": {
      "name": "PLC Logistic Pvt Ltd",
      "logo": "assets/icon/logo.jpg",
      "address": "Plot 21, Sector 18, Gurugram, Haryana - 122015",
      "mobile": "+91 9812345678",
      "email": "support@plclogistics.com",
      "website": "www.plclogistics.com"
    },

    "lrNo": "LR/24-25/45821",
    "tripDate": "2026-04-08",

    "vehicle": {
      "type": "20FT Eicher",
      "number": "MH 04 AA 2025",
      "rtoNo": "HR55"
    },

    "driver": {
      "name": "Ravi Kumar",
      "mobile": "+91 9876543210",
      "licenseNo": "DL0420110012345"
    },

    "consignor": {
      "name": "STL Group",
      "address": "Sector 63, Noida, Uttar Pradesh",
      "pincode": "201301",
      "mobile": "+91 9123456780",
      "gstin": "09AAACS1234F1Z2"
    },

    "consignee": {
      "name": "ABC Pvt Ltd",
      "address": "Bhiwandi Industrial Area, Thane, Maharashtra",
      "pincode": "421302",
      "mobile": "+91 9988776655",
      "gstin": "27AACCA5678H1Z1"
    },

    "invoice": {
      "invoiceNo": "INV/24-25/8891",
      "referenceNo": "REF77821",
      "ewayBillNo": "721234567890",
      "ewayBillExpiry": "2026-04-10",
      "doNo": "",
      "gstPaidBy": "Consignor",
      "containerNo": "CONT12345",
      "lcNo": "LC998877",
      "expiryDate": "2026-12-31"
    },

    "service": {
      "type": "Full Truck Load",
      "containerSize": "20FT",
      "date": "2026-04-08"
    },

    "items": [
      {
        "description": "Printing Machine Parts",
        "unit": "Box",
        "weightKg": 500,
        "quantity": 25,
        "amount": "70,000"
      },
      {
        "description": "Washing Machine Parts",
        "unit": "Box",
        "weightKg": 400,
        "quantity": 20,
        "amount": "60,000"
      }
    ],

    "terms": [
      "Goods once sold will not be accepted.",
      "Transporter not responsible for damage after dispatch."
    ],

    "receiver": {
      "name": "Amit Sharma",
      "mobile": "+91 9876501234",
      "signature": "https://api.yourapp.com/uploads/signatures/amit-sharma-sign.png",
      "receivedAt": "2026-04-09T11:30:00",
      "remarks": "Goods received in good condition"
    }

  }



}
