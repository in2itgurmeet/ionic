import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proof-of-delivery',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './proof-of-delivery.component.html',
  styleUrls: ['./proof-of-delivery.component.scss'],
})
export class ProofOfDeliveryComponent {

  activeTab: number = 1;

  constructor() { }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }

  getProofOfDelivery(): void {
    // Add your logic here to fetch or download the proof of delivery
    console.log('Fetching proof of delivery...');
  }

}
