import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';
import { IndexService } from '../service/index-service';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  isSecondAccordionOpen: boolean = false;
  isPopupOpen: boolean = false;
  ordId: any;
  upiId: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/),
  ]);

  orderData: any = {};

  constructor(
    private defultService: DefultUsageService,
    private indexService: IndexService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ordId = params.get('id');
      if (!this.ordId) {
        this.ordId = localStorage.getItem('ordId');
      }
      if (this.ordId) {
        this.getByOrderId();
      }
    });
  }

  toggleAccordion() {
    this.isSecondAccordionOpen = !this.isSecondAccordionOpen;
  }

  openPopup() {
    this.isPopupOpen = !this.isPopupOpen;
    if (this.isPopupOpen) {
      document.body.classList.add('overlay');
    } else {
      document.body.classList.remove('overlay');
    }
  }

  getByOrderId() {
    this.indexService.getOrderById(this.ordId).subscribe({
      next: (res) => {
        this.orderData = res.body.data;
        this.defultService.successToast(res.body.message || 'Order Details Loaded');
      },
      error: (err) => {
        this.defultService.errorToast(err.error?.message || 'Failed to load order');
      },
    });
  }

  // Dynamic fee calculation getters
  get transportationFee() {
    return ((this.orderData?.amount || 0) * 0.75).toFixed(2);
  }

  get loadingFee() {
    return ((this.orderData?.amount || 0) * 0.25).toFixed(2);
  }

  get grossTotal() {
    return (this.orderData?.amount || 0).toFixed(2);
  }

  get sgst() {
    return ((this.orderData?.amount || 0) * 0.09).toFixed(2);
  }

  get cgst() {
    return ((this.orderData?.amount || 0) * 0.09).toFixed(2);
  }

  get netTotal() {
    return ((this.orderData?.amount || 0) * 1.18).toFixed(2);
  }

  onSubmit() {
   
    const randomTxId = 'TXN' + Date.now() + Math.floor(Math.random() * 1000);
    const payload = {
      paymentType: 'UPI',
      upiId: this.upiId.value?.trim(),
      amount: parseFloat(this.netTotal),
      transactionId: randomTxId
    };

    this.indexService.payMentProcess(payload, this.ordId).subscribe({
      next: (res: any) => {
        this.defultService.successToast(res.body.message || 'Payment Processed');
        this.openPopup();

        setTimeout(() => {
          this.router.navigate(['/indexpage/booked', this.ordId]);
        }, 1500);
      },
      error: (err: any) => {
        this.defultService.errorToast(
          err?.error?.message || 'Payment Failed'
        );
      }
    });
  }
}
