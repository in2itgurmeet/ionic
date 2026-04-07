import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { LorryReceiptComponent } from '../lorry-receipt/lorry-receipt.component';
import { ProofOfDeliveryComponent } from '../proof-of-delivery/proof-of-delivery.component';
import { ShipingLableComponent } from '../shipping-lable/shiping-lable.component';

@Component({
  selector: 'app-lorry-deatils',
  templateUrl: './lorry-deatils.component.html',
  styleUrls: ['./lorry-deatils.component.scss'],
  imports: [CommonModule, IonicModule, LorryReceiptComponent, ShipingLableComponent, ProofOfDeliveryComponent],
})
export class LorryDeatilsComponent implements OnInit {

  activeTab: number = 1;
  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }


}
