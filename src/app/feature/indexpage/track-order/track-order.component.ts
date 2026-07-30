import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IndexService } from '../service/index-service';
import { LeafletMapComponent } from "src/app/shared_component/leaflet-map/leaflet-map.component";
import { LeafletMapComponent } from '../../../shared_component/leaflet-map/leaflet-map.component';

@Component({
  imports: [IonicModule, CommonModule, LeafletMapComponent]
  imports: [IonicModule, CommonModule, LeafletMapComponent],
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss'],
})
export class TrackOrderComponent implements OnInit {
  orderData: any;
  trackingEvents: any[] = [];

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
        this.generateTrackingEvents();
        console.log('Tracking Order Loaded:', this.orderData);
      },
      error: (err) => {
        console.error('Failed to load tracking order details:', err);
      }
    });
  }

  generateTrackingEvents() {
    this.trackingEvents = [];
    if (!this.orderData) return;

    // 1. Order Booked
    if (this.orderData.createdAt) {
      this.trackingEvents.push({
        activity: 'Order Booked',
        time: new Date(this.orderData.createdAt),
        location: this.orderData.pickup?.location || 'Processing Center',
        completed: true
      });
    }

    // 2. Order Assigned
    if (this.orderData.acceptedAt) {
      this.trackingEvents.push({
        activity: 'Driver Assigned',
        time: new Date(this.orderData.acceptedAt),
        location: 'Dispatch Center',
        completed: true
      });
    }

    // 3. Pickup Started
    if (this.orderData.pickupStartedAt) {
      this.trackingEvents.push({
        activity: 'Pickup Started',
        time: new Date(this.orderData.pickupStartedAt),
        location: this.orderData.pickup?.location,
        completed: true
      });
    }

    // 4. In Transit
    if (this.orderData.status === 'In-Transit' || this.orderData.status === 'Delivered') {
      this.trackingEvents.push({
        activity: 'In Transit',
        time: this.orderData.pickupStartedAt ? new Date(new Date(this.orderData.pickupStartedAt).getTime() + 3600000) : new Date(),
        location: 'On the way',
        completed: true
      });
    }

    // 5. Delivered (or expected delivery)
    if (this.orderData.deliveredAt) {
      this.trackingEvents.push({
        activity: 'Delivered',
        time: new Date(this.orderData.deliveredAt),
        location: this.orderData.delivery?.location,
        completed: true
      });
    } else {
      this.trackingEvents.push({
        activity: 'Pending Delivery',
        time: null,
        location: this.orderData.delivery?.location,
        completed: false
      });
    }
  }
}
