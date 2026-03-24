import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  imports: [IonicModule, CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
  isSecondAccordionOpen: boolean = false;
  isPopupOpen: boolean = false;
  constructor() { }
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
}


