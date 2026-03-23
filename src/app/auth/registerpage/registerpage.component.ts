import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registerpage',
  imports: [IonicModule, CommonModule],
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss'],
})
export class RegisterpageComponent implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  password: string = '';
  constructor() { }

  ngOnInit() { }
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
