import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shiping-lable',
  imports: [CommonModule, IonicModule],
  templateUrl: './shiping-lable.component.html',
  styleUrls: ['./shiping-lable.component.scss'],
})
export class ShipingLableComponent {

  activeTab: number = 1;
  constructor() { }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }
}
