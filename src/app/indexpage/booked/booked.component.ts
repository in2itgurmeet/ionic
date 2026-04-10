import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';
import { Api } from 'src/app/Service/api';

@Component({
  selector: 'app-booked',
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss'],
})
export class BookedComponent {
  getOrderData: any;

  constructor(private defultService: DefultUsageService, private route: ActivatedRoute, private api: Api) {
    this.getOrderData = this.defultService.orderData
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id')
      this.getOrderById(id);
    });
  }

  getOrderById(id: any) {
    this.api.getOrderById(id).subscribe({
      next: (res) => {
        this.getOrderData = res[0];
        console.log(this.getOrderData);
      }
    });
  }

}
