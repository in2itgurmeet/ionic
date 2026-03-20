import { IonicModule } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../shared_component/footer/footer.component';
@Component({
  selector: 'app-indexpage',
  imports: [FooterComponent, IonicModule],
  templateUrl: './indexpage.component.html',
  styleUrls: ['./indexpage.component.scss'],
})
export class IndexpageComponent {
  showContent: boolean = false;
  constructor(private router: Router) {
    // Subscribe to router events to track URL changes
    this.router.events.subscribe((event) => {
      // Check if the current URL matches '/indexpage'
      if (this.router.url === '/indexpage/Booked' ||
        this.router.url === '/indexpage/Loory-receipt' ||
        this.router.url === '/indexpage/Feedback' ||
        this.router.url === '/indexpage/Invoice-Bill' ||
        this.router.url === '/indexpage/Shiping-lable'

      ) {
        // Hide the content
        this.showContent = false;
      } else {
        // Show the content for other URLs
        this.showContent = true;
      }
    });
  }

}