import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { menuOutline, notificationsOutline, closeCircleSharp, bagHandleOutline, gridOutline, settings, logOut } from 'ionicons/icons';
import { Api } from 'src/app/Service/api';
import { OutsideClickEmitterDirective } from 'src/app/core/directive/outside-click-emitter.directive';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';
import { AppIcons } from 'src/app/shared_component/ionicIcon';


@Component({
  selector: 'app-driver-theame',
  templateUrl: './driver-theame.component.html',
  styleUrls: ['./driver-theame.component.scss'],
  imports: [IonicModule, CommonModule, RouterLink, OutsideClickEmitterDirective, RouterOutlet]
})
export class DriverTheameComponent implements OnInit {
  icons = AppIcons;

  logOut = logOut;
  viewSidebar: any;
  settings = settings
  urlEndPoint: any;
  logPopupFlag: boolean = false;
  deliveries: any[] = [];
  constructor(private api: Api, private defultService: DefultUsageService, private routes: Router, private router: Router) {

  }
  ngOnInit() {
    this.routes.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.urlEndPoint = event.url;
      }
    });
    this.getDeleiveries()
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
      icon: this.icons.menu,
      lable: "Dashbaord",
      routerLink: "/drive-dashbaord"
    },
    {
      icon: this.icons.bag,
      lable: "My Order",
      routerLink: "/drive-dashbaord/myOrders"
    },
    {
      icon: this.icons.settings,
      lable: "Settings",
      routerLink: "/drive-dashbaord/settings"
    },
  ]
  goToPage() {
    this.urlEndPoint = this.routes.url
    this.viewSidebar = false
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.urlEndPoint = path;
  }
}
