import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shiping-lable',
  imports: [CommonModule, IonicModule],
  templateUrl: './shiping-lable.component.html',
  styleUrls: ['./shiping-lable.component.scss'],
})
export class ShipingLableComponent {

  activeTab: number = 1;
  constructor() { }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }

  shippingData = [
    {
      "docketNo": "ADWQ321850",
      "company": {
        "name": "V-EXPRESS",
        "logo": "assets/icon/logo.jpg"
      },
      "origin": {
        "address": "Sector 63, Noida, Uttar Pradesh - 201301"
      },
      "destination": {
        "address": "Bhiwandi Industrial Area, Thane, Maharashtra - 421302"
      },
      "shipment": {
        "date": "2026-04-08",
        "weight": "10kg",
        "totalPackages": 10,
        "currentPackage": 1
      },
      "invoice": {
        "invoiceNo": "INV/24-25/8891"
      },
      "returnToOrigin": true,
      "barcode": {
        "value": "ADWQ321850",
        "imageUrl": "https://www.shutterstock.com/image-vector/horizontal-black-barcode-on-white-600nw-1221838477.jpg"
      }
    },
    {
      "docketNo": "ADWQ321850",
      "company": {
        "name": "V-EXPRESS",
        "logo": "assets/icon/logo.jpg"
      },
      "origin": {
        "address": "Sector 63, Noida, Uttar Pradesh - 201301"
      },
      "destination": {
        "address": "Bhiwandi Industrial Area, Thane, Maharashtra - 421302"
      },
      "shipment": {
        "date": "2026-04-08",
        "weight": "10kg",
        "totalPackages": 10,
        "currentPackage": 1
      },
      "invoice": {
        "invoiceNo": "INV/24-25/8891"
      },
      "returnToOrigin": true,
      "barcode": {
        "value": "ADWQ321850",
        "imageUrl": "https://www.shutterstock.com/image-vector/horizontal-black-barcode-on-white-600nw-1221838477.jpg"
      }
    }

  ]
}
