import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IndexService } from '../service/index-service';

@Component({
  selector: 'app-track-order',
  imports: [IonicModule, CommonModule],
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss'],
})
export class TrackOrderComponent implements OnInit {
  orderData: any;

  constructor(
    private route: ActivatedRoute,
    private indexService: IndexService
  ) { }

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
        this.orderData = res.body.data;
        console.log('Tracking Order Loaded:', this.orderData);
      },
      error: (err) => {
        console.error('Failed to load tracking order details:', err);
      }
    });
  }
}
