import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { LorryReceiptComponent } from '../lorry-receipt/lorry-receipt.component';
import { ProofOfDeliveryComponent } from '../proof-of-delivery/proof-of-delivery.component';
import { ShipingLableComponent } from '../shipping-lable/shiping-lable.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lorry-deatils',
  templateUrl: './lorry-deatils.component.html',
  styleUrls: ['./lorry-deatils.component.scss'],
  imports: [CommonModule, IonicModule, LorryReceiptComponent, ShipingLableComponent, ProofOfDeliveryComponent],
})
export class LorryDeatilsComponent implements OnInit {

  activeTab: number = 1;
  orderId: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id') || '';
    });
  }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }


}
