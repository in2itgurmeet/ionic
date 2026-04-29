import { IonicModule } from '@ionic/angular';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFlowService } from '../auth-flow-service';

@Component({
  selector: 'app-forget-password',
  imports: [IonicModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ForgetPasswordComponent implements OnInit {
  minutes: number = 0;
  seconds: number = 59;
  showTimer: boolean = true;
  otpForm!: FormGroup;
  forgetPasswordForm!: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  password: string = '';
  resetPasswordForm: any;
  constructor(
    private routes: Router,
    public flow: AuthFlowService,
    private fb: FormBuilder,
  ) {
    this.flow.loadEmail();
  }

  ngOnInit() {
    this.initForgetPasswordForm();
    this.initOtpForm();
    this.startTimer();
    this.initResetPasswordForm();
  }

  initForgetPasswordForm() {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
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
  initResetPasswordForm() {
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
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
  onSubmitForgetPass() {
    console.log(this.forgetPasswordForm.value);
    this.routes.navigate(['/auth/sendOtp']);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }

  sendOtp() {
    if (this.forgetPasswordForm.invalid) return;
    this.flow.setEmail(this.forgetPasswordForm.value.email);
    this.flow.setStep('otp');
  }

  verifyOtp() {
    if (this.otpForm.invalid) return;
    this.flow.setStep('reset-password');
  }

    onSubmitResetPass() {
      console.log(this.resetPasswordForm.value);
      this.routes.navigate(['/auth']);
    }
      
  goBack(event: any) {
    this.flow.setStep(event);
  }


}
