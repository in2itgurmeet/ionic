import { Component, effect } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import { DefultUsageService } from './Service/defult-usage.service';
import { LoaderService } from './Service/loader.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [RouterOutlet, IonicModule],
})
export class AppComponent {



  ngOnInit() {

  }

  removeToast(id: number) {
  }
  constructor(
    private authState: DefultUsageService,
    private router: Router,
    public loaderService: LoaderService
  ) {
    effect(() => {
      if (!this.authState.isLoggedIn()) {
        this.router.navigate(['/auth']);
      }
    });
    addIcons(allIcons);

  }
}


