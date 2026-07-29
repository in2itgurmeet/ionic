import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IndexService } from '../../service/index-service';

@Component({
  selector: 'app-shiping-lable',
  imports: [CommonModule, IonicModule],
  templateUrl: './shiping-lable.component.html',
  styleUrls: ['./shiping-lable.component.scss'],
})
export class ShipingLableComponent implements OnInit {
  @Input() orderId: string = '';

  activeTab: number = 1;

  shippingData: any[] = [];

  constructor(private indexService: IndexService) { }

  ngOnInit() {
    if (this.orderId) {
      this.getShippingLabelDetails();
    }
  }

  getShippingLabelDetails() {
    this.indexService.getShippingLabel(this.orderId).subscribe({
      next: (res) => {
        const data = res.body?.data;
        if (data) {
          this.shippingData = [data];
        }
      }
    });
  }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }

}
