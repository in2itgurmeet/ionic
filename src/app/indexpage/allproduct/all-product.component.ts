import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss'],
})
export class AllProductComponent  implements OnInit {

  activeTab: number = 1;
  

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }

  ngOnInit() {}

}
