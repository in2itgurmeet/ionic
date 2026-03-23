import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-login',
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.scss'],
})
export class MyLoginComponent {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  password: string = '';

  showPassword: boolean = false;

  constructor() { }






  togglePasswordVisibility(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }
}
