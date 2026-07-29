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

  lrData: any = {};

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
