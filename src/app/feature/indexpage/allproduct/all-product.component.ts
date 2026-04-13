import { Api } from './../../Service/api';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';

@Component({
  selector: 'app-all-product',
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss'],
})
export class AllProductComponent implements OnInit {
  orderData: any[] = []
  allOrders: any[] = [];
  activeTab: number = 1;
  tabStatusMap: any = {
    1: 'All',
    2: 'Pending',
    3: 'Booked',
    4: 'In-Transit',
    5: 'Delivered',
    6: 'Cancelled'
  };

  constructor(private api: Api, private router: Router, private alertCtrl: AlertController, private defultServise: DefultUsageService, private route: Router) { }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
    this.filterData();
  }

  ngOnInit() {
    this.getOrders()
  }

  /**
   * @description get orders
   * @author Gurmeet kumar
   */
  getOrders() {
    this.api.getOrdersData().subscribe({
      next: (res) => {
        this.allOrders = res;
        this.filterData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  /**
   * @description filter data by status
   * @author Gurmeet kumar
   */
  filterData() {
    const selectedStatus = this.tabStatusMap[this.activeTab];

    if (selectedStatus === 'All') {
      this.orderData = this.allOrders;
    } else {
      this.orderData = this.allOrders.filter(
        item => item.status === selectedStatus
      );
    }
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Pending':
        return 'bg-warning text-dark';
      case 'Booked':
        return 'bg-primary text-white';
      case 'In-Transit':
        return 'bg-info text-white';
      case 'Delivered':
        return 'bg-success text-white';
      case 'Cancelled':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  }


  isButtonDisabled(status: string): boolean {
    return status === 'Delivered' || status === 'Cancelled';
  }

  /**
   * @description get button text
   * @param status 
   * @returns 
   */
  getButtonText(status: string): string {
    switch (status) {
      case 'Pending':
        return 'Book Now';
      case 'Booked':
        return 'View Details';
      case 'In-Transit':
        return 'Track Order';
      case 'Delivered':
        return 'Completed';
      case 'Cancelled':
        return 'Cancelled';
      default:
        return 'Book Now';
    }
  }

  /**
    * @description handle action by status
    * @param item by action
    * @author Gurmeet kumar
    */
  handleAction(item: any) {
    switch (item.status) {
      case 'Pending':
        this.router.navigate(['/indexpage/booking'], {
          queryParams: { orderId: item.orderId }
        });
        break;
      case 'Booked':
        this.router.navigate(['/indexpage/order-details', item.orderId]);
        break;
      case 'In-Transit':
        this.router.navigate(['/indexpage/tracking-Order', item.orderId]);
        break;
      default:
        console.log('No action for this status');
    }
  }

  /**
   * @description show full address
   * @param address
   * @author Gurmeet kumar
   */
  async showFullAddress(address: string) {
    const alert = await this.alertCtrl.create({
      header: 'Full Address',
      message: address,
      buttons: ['OK']
    });
    await alert.present();
  }


  /**
   * @description cancel order 
   * @param item 
   * @returns 
   */
  cancelOrder(item: any) {
    if (!this.canCancel(item.status)) return;
    Swal.fire({
      title: 'Cancel Order?',
      text: 'Are you sure you want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.updateStatus(item.id, 'Cancelled').subscribe({
          next: () => {
            item.status = 'Cancelled';

            Swal.fire({
              title: 'Cancelled!',
              text: 'Order has been cancelled.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.log(err);

            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong.',
              icon: 'error'
            });
          }
        });
      }
    });
  }


  canCancel(status: string): boolean {
    return status !== 'Delivered' && status !== 'Cancelled';
  }


  setBookingType(mode: 'FTL' | 'PTL') {
    this.defultServise.bookingMode.set(mode);
    localStorage.setItem('bookingMode', mode);
    this.route.navigate(['/indexpage/booking']);
  }

  getLorryReciept(event: any) {
    if (event) {
      // this.route.navigate(['/indexpage/lorry-details/', event]);
    }
  }
  getOrderDetails(event: any) {
    if (event) {
      this.route.navigate(['/indexpage/lorry-details', event]);
    }
  }

}