import { Component } from '@angular/core';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  {
  formattedDateTime: string | undefined;
  private timer: any;
  constructor(public defultServise: DefultUsageService) {
    this.updateDateTime();
    // Update the time every second
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
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const month = date.getMonth() + 1; // Month is zero-indexed
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    const strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return `${formattedDate} ${strTime}`;
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }











  
 
}
