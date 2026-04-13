import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from 'src/app/feature/auth/auth-routing-module';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-home',
  imports: [CommonModule, IonicModule, AuthRoutingModule,],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  @ViewChild('slider', { static: false })
  slider!: ElementRef;

  currentSlide = 0;
  slides: HTMLElement[] = [];
  intervalSubscription: any;

}
