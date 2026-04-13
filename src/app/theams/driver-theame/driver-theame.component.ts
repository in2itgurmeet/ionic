import { IonicModule } from '@ionic/angular';
import { Component, effect, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { menuOutline, notificationsOutline, closeCircleSharp, bagHandleOutline, gridOutline, settings, logOut, flash, colorWandOutline } from 'ionicons/icons';
import { Api } from 'src/app/Service/api';
import { OutsideClickEmitterDirective } from 'src/app/core/directive/outside-click-emitter.directive';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';
@Component({
  selector: 'app-driver-theame',
  templateUrl: './driver-theame.component.html',
  styleUrls: ['./driver-theame.component.scss'],
  imports: [IonicModule, CommonModule, RouterLink, OutsideClickEmitterDirective, RouterOutlet]
})
export class DriverTheameComponent implements OnInit {
  menuIcon = menuOutline;
  notificationIcon = notificationsOutline;
  closeIcon = closeCircleSharp;
  bagIcon = bagHandleOutline
  gridIcon = gridOutline
  logOut = logOut;
  viewSidebar: any;
  settings = settings
  urlEndPoint: any;
  logPopupFlag: boolean = false;
  deliveries: any[] = [];
  constructor(private api: Api, private defultService: DefultUsageService, private routes: Router) {

  }
  ngOnInit() {
    console.log(this.routes.url)
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

  logPopup() {
    this.logPopupFlag = !this.logPopupFlag
  }
  closeOutside(_event: any) {
    if (_event) {
      this.logPopupFlag = false;
    }
  }
  openSidebar() {
    this.viewSidebar = !this.viewSidebar
  }
  sidbarJson = [
    {
      icon: this.gridIcon,
      lable: "Dashbaord",
      routerLink: "/drive-dashbaord"
    },
    {
      icon: this.bagIcon,
      lable: "My Order",
      routerLink: "/drive-dashbaord/myOrders"
    },
    {
      icon: this.settings,
      lable: "Settings",
      routerLink: "/drive-dashbaord/settings"
    },
  ]
  goToPage() {
    this.urlEndPoint = this.routes.url
    this.viewSidebar = false
  }
}
