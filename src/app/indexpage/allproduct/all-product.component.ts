import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-all-product',
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss'],
})
export class AllProductComponent implements OnInit {

  activeTab: number = 1;


  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }

  ngOnInit() { }

}
