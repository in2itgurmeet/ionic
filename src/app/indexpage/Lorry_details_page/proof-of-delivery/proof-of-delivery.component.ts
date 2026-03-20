import { Component } from '@angular/core';

@Component({
  selector: 'app-proof-of-delivery',
  templateUrl: './proof-of-delivery.component.html',
  styleUrls: ['./proof-of-delivery.component.scss'],
})
export class ProofOfDeliveryComponent   {

  activeTab: number = 1;
constructor(){}

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }


}
