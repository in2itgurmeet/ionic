import { IonicModule } from '@ionic/angular';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtpComponent implements OnInit {

  minutes: number = 0;
  seconds: number = 59;
  showTimer: boolean = true;
  otpForm!: FormGroup;
  constructor(private fb: FormBuilder,private router:Router) {}

  ngOnInit(): void {
    this.initOtpForm();
    this.startTimer();
  }
  initOtpForm() {
    this.otpForm = this.fb.group({
      d1: ['', Validators.required],
      d2: ['', Validators.required],
      d3: ['', Validators.required],
      d4: ['', Validators.required],  
      d5: ['', Validators.required],
      d6: ['', Validators.required],
    });
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

  onSubmit(){
    this.router.navigate(['/auth/resetpassword']);
  }
}
