import { routes } from './../../../app.routes';
import { IonicModule } from '@ionic/angular';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  imports: [IonicModule, CommonModule, RouterLink,ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForgetPasswordComponent implements OnInit {
forgetPasswordForm!:FormGroup
  constructor(private routes: Router) { }
 
  ngOnInit() {
    this.initForgetPasswordForm();
   }



  initForgetPasswordForm(){
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  onSubmit() {
    console.log(this.forgetPasswordForm.value);
    this.routes.navigate(['/auth/sendOtp']);
  }



}
