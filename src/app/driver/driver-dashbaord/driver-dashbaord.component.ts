import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { menuOutline, notificationsOutline, close } from 'ionicons/icons';

@Component({
  selector: 'app-driver-dashbaord',
  templateUrl: './driver-dashbaord.component.html',
  styleUrls: ['./driver-dashbaord.component.scss'],
  imports: [IonicModule, CommonModule,]
})
export class DriverDashbaordComponent implements OnInit {
  menuIcon = menuOutline;
  notificationIcon = notificationsOutline;
  closeIcon = close;
  viewSidebar = false;

  ngOnInit() { }

  deliveries = [
    {
      id: '87642',
      date: '14 Feb',
      address: 'Sector 45, Gurgaon',
      time: '10:30 AM',
      price: 250,
      status: 'ongoing'
    },
    {
      id: '77481',
      date: '14 Feb',
      address: 'DLF Phase 2',
      time: '11:15 AM',
      price: 180,
      status: 'pending'
    }
  ];
  openMenu() {
    this.viewSidebar = !this.viewSidebar;
  }
}
