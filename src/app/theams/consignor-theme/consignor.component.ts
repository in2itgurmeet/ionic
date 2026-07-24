import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/shared_component/footer/footer.component';

@Component({
  selector: 'app-consignor',
  templateUrl: './consignor.component.html',
  styleUrls: ['./consignor.component.scss'],
  imports: [RouterOutlet, IonicModule, FooterComponent],

})
export class ConsignorThemeComponent implements OnInit {

  showContent: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe((_event: any) => {
      const url = this.router.url.split('?')[0];
      if (url === '/indexpage' ||
          url === '/indexpage/all-product' ||
          url === '/indexpage/invoice-details' ||
          url === '/indexpage/feedback' ||
          url === '/indexpage/profile'
      ) {
        this.showContent = true;
      } else {
        this.showContent = false;
      }
    });
  }

  ngOnInit() {
    console.log(this.showContent);
  }


}
