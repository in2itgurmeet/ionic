import { IonicModule } from '@ionic/angular';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-otp',
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

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