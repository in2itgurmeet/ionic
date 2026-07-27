import { IonicModule, ToastController } from '@ionic/angular';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IndexService } from '../../service/index-service';
import { LorryPrintComponent } from '../lorry-print/lorry-print.component';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';

@Component({
  selector: 'app-lorry-receipt',
  imports: [IonicModule, CommonModule, FormsModule, LorryPrintComponent],
  templateUrl: './lorry-receipt.component.html',
  styleUrls: ['./lorry-receipt.component.scss'],
})
export class LorryReceiptComponent implements OnInit {
  @Input() orderId: string = '';
  @ViewChild('lorryPrint', { static: false }) lorryPrint!: LorryPrintComponent;

  isSecondAccordionOpen: boolean = false;
  isPopupOpen: boolean = false;
  isShareModalOpen: boolean = false;
  shareEmail: string = '';

  activeTab: number = 1;

  lrData: any = {
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

  };

  constructor(
    private indexService: IndexService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private defultService: DefultUsageService
  ) { }

  ngOnInit() {
    if (this.orderId) {
      this.getLorryReceiptDetails();
    }
  }

  getLorryReceiptDetails() {
    this.indexService.getLorryReceipt(this.orderId).subscribe({
      next: (res) => {
        const data = res.body?.data;
        if (data) {
          this.lrData = data;
          this.route.queryParams.subscribe(params => {
            if (params['action'] === 'print') {
              setTimeout(() => {
                this.printPage();
              }, 800);
            }
          });
        }
      }
    });
  }

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
    if (this.lorryPrint) {
      this.lorryPrint.generatePdf(this.orderId, 'print');
    }
  }

  downloadReceiptPdf() {
    if (this.lorryPrint) {
      this.lorryPrint.generatePdf(this.orderId, 'download');
    }
  }

  openShareModal() {
    this.isShareModalOpen = !this.isShareModalOpen;
    if (this.isShareModalOpen) {
      document.body.classList.add('overlay');
    } else {
      document.body.classList.remove('overlay');
      this.shareEmail = '';
    }
  }

  async shareReceiptByEmail() {
    if (!this.shareEmail) {
      this.defultService.errorToast('Please enter an email address.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.shareEmail)) {
      this.defultService.errorToast('Please enter a valid email address.');
      return;
    }

    const loadingToast = await this.toastController.create({
      message: 'Generating and sending PDF Lorry Receipt...',
      position: 'top',
      color: 'primary'
    });
    await loadingToast.present();

    this.lorryPrint.getPdfBase64(this.orderId).then(base64 => {
      this.indexService.shareLorryReceipt(this.shareEmail, base64, this.lrData?.lrNo).subscribe({
        next: (res) => {
          loadingToast.dismiss();
          this.defultService.successToast('Lorry Receipt shared successfully! ✉️');
          // this.openShareModal();
        },
        error: (err) => {
          loadingToast.dismiss();
          console.error('Failed to share LR:', err);
          this.defultService.errorToast(err.error?.message || 'Failed to share Lorry Receipt.');
        }
      });
    }).catch(err => {
      loadingToast.dismiss();
      this.defultService.errorToast('Failed to generate sharing PDF document.');
    });
  }

}
