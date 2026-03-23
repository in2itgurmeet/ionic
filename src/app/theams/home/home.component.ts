import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from "src/app/auth/auth-routing-module";

@Component({
  selector: 'app-home',
  imports: [CommonModule, IonicModule, AuthRoutingModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
