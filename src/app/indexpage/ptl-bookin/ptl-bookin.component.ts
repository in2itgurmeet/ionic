import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from 'src/app/Service/api';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ptl-bookin',
  imports: [IonicModule, CommonModule],
  templateUrl: './ptl-bookin.component.html',
  styleUrls: ['./ptl-bookin.component.scss'],
})
export class PtlBookinComponent {
  pickupResults: any[] = [];
  deliveryResults: any[] = [];
  selectedPickup: any = null;
  selectedDelivery: any = null;

  constructor(private api: Api, private routes: Router) { }
  searchPickup(event: any) {
    const value = event.target.value;

    if (value.length > 2) {
      this.api.searchLocation(value).subscribe((res: any) => {
        this.pickupResults = res.features;
      });
    } else {
      this.pickupResults = [];
    }
  }

  searchDelivery(event: any) {
    const value = event.target.value;

    if (value.length > 2) {
      this.api.searchLocation(value).subscribe((res: any) => {
        this.deliveryResults = res.features;
      });
    } else {
      this.deliveryResults = [];
    }
  }

  selectPickup(item: any) {
    this.selectedPickup = item;
    this.pickupResults = [];
  }

  selectDelivery(item: any) {
    this.selectedDelivery = item;
    this.routes.navigate(['/indexpage/createOrderPtl'], { queryParams: { orderId: item.orderId } });

    this.deliveryResults = [];
  }




  @HostListener('document:click', ['$event'])
  handleClickOutside(event: any) {
    const clickedInside = event.target.closest('.input_feild_section')
      || event.target.closest('.dropdown-list');
    if (!clickedInside) {
      this.pickupResults = [];
      this.deliveryResults = [];
    }
  }


}
