import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { menuOutline, notificationsOutline, closeCircleSharp, bagHandleOutline, gridOutline, settings, logOut, flash } from 'ionicons/icons';
import { Api } from 'src/app/Service/api';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';
import { Chart } from 'chart.js/auto';
import { Apiservice } from '../service/apiservice';

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
  logOut = logOut
  viewSidebar = false;
  settings = settings;
  urlEndPoint: any;
  chart: any;
  currentType: string = 'weekly';
  logPopupFlag: boolean = false;
  deliveries: any[] = [];
  constructor(private api: Api, private defultService: DefultUsageService, private driverApi: Apiservice) {

  }
  chartApiData: any;

  ngOnInit() {
    this.driverApi.getChartData().subscribe(
      {
        next: (res) => {
          this.chartApiData = res;
          this.loadChart('weekly', res);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
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
  loadChart(type: string, apiData: any) {
    this.currentType = type;
    if (this.chart) {
      this.chart.destroy();
    }
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const selectedData = apiData[type];
    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: selectedData.labels,
        datasets: [{
          label: 'Revenue',
          data: selectedData.data,
          borderColor: 'pink',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4
        }]
      }
    });
  }



}
