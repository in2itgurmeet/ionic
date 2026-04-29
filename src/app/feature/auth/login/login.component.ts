import { IonicModule } from '@ionic/angular';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authservice } from '../service/authservice';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-login',
  imports: [IonicModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]


})
export class LoginComponent implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  password: string = '';
  loginForm!: FormGroup
  showPassword: boolean = false;

  constructor(private apiService:Authservice,private toastController: ToastController) { }

ngOnInit(): void {
  this.initLoginForm();
}

initLoginForm() {
  this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
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




  submit() {
   this.apiService.loginUser(this.loginForm.value).subscribe({
     next: (res) => {
      localStorage.setItem('token', res.token);
      this.loginForm.reset();
      async successToast(msg: string) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 3000,
    position: 'top',
    color: 'success',
    icon: 'checkmark-circle'
  });

  await toast.present();
}

     },
     error: (err) => {
       console.log(err);
     }
   });
  }
}
