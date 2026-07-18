import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { DefultUsageService } from 'src/app/Service/defult-usage.service';
import { IndexService } from '../service/index-service';

@Component({
  selector: 'app-all-product',
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss'],
})
export class AllProductComponent implements OnInit {
  orderData: any[] = [];
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

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private defultServise: DefultUsageService,
    private indexService: IndexService
  ) { }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
    this.filterData();
  }

  ngOnInit() {
    this.getOrders();
  }

  /**
   * @description get orders from real backend
   */
  getOrders() {
    this.indexService.getAllOrders().subscribe({
      next: (res) => {
        this.allOrders = res.body.data || [];
        this.filterData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  /**
   * @description filter data by status mapping Draft -> Pending
   */
  filterData() {
    const selectedStatus = this.tabStatusMap[this.activeTab];

    if (selectedStatus === 'All') {
      this.orderData = this.allOrders;
    } else if (selectedStatus === 'Pending') {
      this.orderData = this.allOrders.filter(
        item => item.status === 'Pending' || item.status === 'Draft'
      );
    } else if (selectedStatus === 'In-Transit') {
      this.orderData = this.allOrders.filter(
        item => item.status === 'In-Transit' || item.status === 'Assigned' || item.status === 'Pickup Started'
      );
    } else {
      this.orderData = this.allOrders.filter(
        item => item.status === selectedStatus
      );
    }
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Pending':
      case 'Draft':
        return 'bg-warning text-dark';
      case 'Booked':
        return 'bg-primary text-white';
      case 'In-Transit':
      case 'Assigned':
      case 'Pickup Started':
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
   */
  getButtonText(status: string): string {
    switch (status) {
      case 'Pending':
      case 'Draft':
        return 'Book Now';
      case 'Booked':
        return 'View Details';
      case 'In-Transit':
      case 'Assigned':
      case 'Pickup Started':
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
    * @description handle action using MongoDB _id
    */
  handleAction(item: any) {
    switch (item.status) {
      case 'Pending':
      case 'Draft':
        this.router.navigate(['/indexpage/order-details', item._id]);
        break;
      case 'Booked':
        this.router.navigate(['/indexpage/booked', item._id]);
        break;
      case 'In-Transit':
      case 'Assigned':
      case 'Pickup Started':
        this.router.navigate(['/indexpage/tracking-Order', item._id]);
        break;
      default:
        console.log('No action for this status');
    }
  }

  /**
   * @description show full address
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
   * @description cancel order via backend status update
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
        this.indexService.updateOrderStatus(item._id, 'Cancelled').subscribe({
          next: () => {
            item.status = 'Cancelled';

            Swal.fire({
              title: 'Cancelled!',
              text: 'Order has been cancelled.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
            this.getOrders();
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
    this.router.navigate(['/indexpage/booking']);
  }

  getLorryReciept(id: any) {
    if (id) {
      this.router.navigate(['/indexpage/lorry-details/', id]);
    }
  }

  getOrderDetails(id: any) {
    if (id) {
      this.router.navigate(['/indexpage/lorry-details', id]);
    }
  }
}