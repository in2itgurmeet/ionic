import { IonicModule } from '@ionic/angular';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-pasword',
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './reset-pasword.component.html',
  styleUrls: ['./reset-pasword.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ResetPaswordComponent implements OnInit {
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
