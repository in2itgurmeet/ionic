import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [IonicModule, RouterOutlet],
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
