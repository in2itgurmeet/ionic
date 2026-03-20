import { Component } from '@angular/core';

@Component({
  selector: 'app-shiping-lable',
  templateUrl: './shiping-lable.component.html',
  styleUrls: ['./shiping-lable.component.scss'],
})
export class ShipingLableComponent   {

  activeTab: number = 1;
constructor(){}

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }
}
