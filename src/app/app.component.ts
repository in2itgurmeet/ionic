import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [RouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons(allIcons);
  }


  ngOnInit() {

  }

  removeToast(id: number) {
  }

}
