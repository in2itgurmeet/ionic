import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';

@Component({
  selector: 'app-booked',
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss'],
})
export class BookedComponent {
  getOrderData: any;

  constructor(private defultService: DefultUsageService, private route: Router) {

    this.getOrderData = this.defultService.orderData
    console.log(this.getOrderData);
  }



}
