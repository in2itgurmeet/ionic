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


}
