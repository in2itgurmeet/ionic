import { IonicModule } from '@ionic/angular';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForgetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
