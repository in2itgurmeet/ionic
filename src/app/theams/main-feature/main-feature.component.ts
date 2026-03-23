import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/shared_component/footer/footer.component';

@Component({
  selector: 'app-main-feature',
  imports: [RouterOutlet, FooterComponent, IonicModule],
  templateUrl: './main-feature.component.html',
  styleUrls: ['./main-feature.component.scss'],
})
export class MainFeatureComponent implements OnInit {


  ngOnInit() { }
  showContent: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe((_event: any) => {
      if (this.router.url === '/indexpage/booked' ||
        this.router.url === '/indexpage/loory-receipt' ||
        this.router.url === '/indexpage/feedback' ||
        this.router.url === '/indexpage/invoice-Bill' ||
        this.router.url === '/indexpage/shiping-lable'

      ) {
        this.showContent = false;
      } else {
        this.showContent = true;
      }
    });
  }
}
