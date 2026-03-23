import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  imports: [IonicModule, CommonModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OTPComponent implements OnInit {
  minutes: number = 0;
  seconds: number = 59;
  showTimer: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    const interval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.showTimer = false;
          clearInterval(interval);
        }
      }
    }, 1000);
  }
}