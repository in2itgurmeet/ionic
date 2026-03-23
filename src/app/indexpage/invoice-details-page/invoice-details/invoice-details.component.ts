import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-details',
  imports: [IonicModule, CommonModule],
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  isDisabled = true;
  activeTab: number = 1;
  constructor() { }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }
  ngOnInit() { }

}
