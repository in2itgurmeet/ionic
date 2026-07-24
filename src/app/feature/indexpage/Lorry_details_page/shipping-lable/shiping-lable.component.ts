import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IndexService } from '../../service/index-service';

@Component({
  selector: 'app-shiping-lable',
  imports: [CommonModule, IonicModule],
  templateUrl: './shiping-lable.component.html',
  styleUrls: ['./shiping-lable.component.scss'],
})
export class ShipingLableComponent implements OnInit {
  @Input() orderId: string = '';

  activeTab: number = 1;

  shippingData: any[] = [
    {
      "docketNo": "ADWQ321850",
      "company": {
        "name": "PLC Logistic Pvt Ltd",
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
  ];

  constructor(private indexService: IndexService) { }

  ngOnInit() {
    if (this.orderId) {
      this.getShippingLabelDetails();
    }
  }

  getShippingLabelDetails() {
    this.indexService.getShippingLabel(this.orderId).subscribe({
      next: (res) => {
        const data = res.body?.data;
        if (data) {
          this.shippingData = [data];
        }
      }
    });
  }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }

}
