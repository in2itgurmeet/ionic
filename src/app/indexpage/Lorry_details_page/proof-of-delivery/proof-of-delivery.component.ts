import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proof-of-delivery',
  imports: [IonicModule, CommonModule],
  templateUrl: './proof-of-delivery.component.html',
  styleUrls: ['./proof-of-delivery.component.scss'],
})
export class ProofOfDeliveryComponent {

  activeTab: number = 1;
  constructor() { }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }


}
