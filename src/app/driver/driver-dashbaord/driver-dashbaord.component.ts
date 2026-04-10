import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { menuOutline, notificationsOutline, closeCircleSharp, bagHandleOutline, gridOutline } from 'ionicons/icons';
import { Api } from 'src/app/Service/api';

@Component({
  selector: 'app-driver-dashbaord',
  templateUrl: './driver-dashbaord.component.html',
  styleUrls: ['./driver-dashbaord.component.scss'],
  imports: [IonicModule, CommonModule,]
})
export class DriverDashbaordComponent implements OnInit {
  menuIcon = menuOutline;
  notificationIcon = notificationsOutline;
  closeIcon = closeCircleSharp;
  bagIcon = bagHandleOutline
  gridIcon = gridOutline
  viewSidebar = false;
  deliveries: any[] = [];
  constructor(private api: Api) { }
  ngOnInit() { }


  openMenu() {
    this.viewSidebar = !this.viewSidebar;
  }

  getDeleiveries() {
    this.api.getDeliveriesData().subscribe({
      next: (res) => {
        this.deliveries = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
