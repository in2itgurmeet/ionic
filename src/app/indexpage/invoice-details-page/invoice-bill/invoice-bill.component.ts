import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-bill',
  templateUrl: './invoice-bill.component.html',
  styleUrls: ['./invoice-bill.component.scss'],
})
export class InvoiceBillComponent  implements OnInit {
  isPopupOpen: boolean = false;
  constructor() { }

  ngOnInit() {}
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
