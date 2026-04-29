import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';
import { IndexService } from '../service/index-service';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  imports: [IonicModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
  isSecondAccordionOpen: boolean = false;
  isPopupOpen: boolean = false;
  ordId: any;
  upiId: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/),
  ]);

  orderData: any = {};

  ngOnInit() {
    this.getByOrderId();
  }

  constructor(
    private defultService: DefultUsageService,
    private indexService: IndexService,
  ) {
    this.ordId = localStorage.getItem('ordId');
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
        this.orderData = res.data;
        this.defultService.successToast(res.message);
      },
      error: (err) => {
        this.defultService.errorToast(err.error.message);
      },
    });
  }

  onSubmit() {
    if (this.upiId.invalid) {
      this.defultService.errorToast('Enter valid UPI ID');
      return;
    }
    const payload = {
      paymentType: 'UPI',
      upiId: this.upiId.value,
      amount: this.orderData.amount
    };

    this.indexService.payMentProcess(payload, this.ordId).subscribe({
      next: (res) => {
        this.defultService.successToast(res.message);
        this.openPopup();
      },
      error: (err) => {
        this.defultService.errorToast(err.error.message);
      }
    });
  }

}
