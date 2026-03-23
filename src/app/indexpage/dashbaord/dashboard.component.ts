import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, } from '@angular/router';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  formattedDateTime: string | undefined;
  private timer: any;
  constructor(public defultServise: DefultUsageService, private routermodule: Router) {
    this.updateDateTime();
    this.timer = setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  updateDateTime(): void {
    const currentDate = new Date();
    this.formattedDateTime = this.formatDateTime(currentDate);
  }

  formatDateTime(date: Date): string {
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    let seconds: number | string = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    const strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return `${formattedDate} ${strTime}`;
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }



  // fun() {
  //   console.log('sfgh');
  //   this.routermodule.navigate(['/ptlBooking']);
  // }









}
