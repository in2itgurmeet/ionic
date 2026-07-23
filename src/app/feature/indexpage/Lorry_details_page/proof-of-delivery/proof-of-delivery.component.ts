import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexService } from '../../service/index-service';

@Component({
  selector: 'app-proof-of-delivery',
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './proof-of-delivery.component.html',
  styleUrls: ['./proof-of-delivery.component.scss'],
})
export class ProofOfDeliveryComponent implements OnInit {
  @Input() orderId: string = '';

  activeTab: number = 1;
  podData: any = null;

  constructor(private indexService: IndexService) { }

  ngOnInit() {
    if (this.orderId) {
      this.getProofOfDelivery();
    }
  }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }

  getProofOfDelivery(): void {
    this.indexService.getProofDelivery(this.orderId).subscribe({
      next: (res) => {
        this.podData = res.body?.data;
        console.log('Proof of delivery loaded:', this.podData);
      },
      error: (err) => {
        console.error('Failed to load POD:', err);
      }
    });
  }

}
