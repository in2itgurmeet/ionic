import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';
import { IndexService } from '../service/index-service';

@Component({
  selector: 'app-booked',
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss'],
})
export class BookedComponent implements OnInit {
  getOrderData: any;

  constructor(
    private defultService: DefultUsageService, 
    private route: ActivatedRoute, 
    private indexService: IndexService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this.getOrderById(id);
      }
    });
  }

  getOrderById(id: any) {
    this.indexService.getOrderById(id).subscribe({
      next: (res) => {
        this.getOrderData = res.body.data;
        console.log('Booked Order Loaded:', this.getOrderData);
      },
      error: (err) => {
        console.error('Failed to load booked order details:', err);
      }
    });
  }

  // Dynamic fee calculation getters
  get transportationFee() {
    return ((this.getOrderData?.amount || 0) * 0.75).toFixed(2);
  }

  get loadingFee() {
    return ((this.getOrderData?.amount || 0) * 0.25).toFixed(2);
  }

  get grossTotal() {
    return (this.getOrderData?.amount || 0).toFixed(2);
  }

  get sgst() {
    return ((this.getOrderData?.amount || 0) * 0.09).toFixed(2);
  }

  get cgst() {
    return ((this.getOrderData?.amount || 0) * 0.09).toFixed(2);
  }

  get netTotal() {
    return ((this.getOrderData?.amount || 0) * 1.18).toFixed(2);
  }
}
