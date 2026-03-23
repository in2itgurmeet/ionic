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
}
