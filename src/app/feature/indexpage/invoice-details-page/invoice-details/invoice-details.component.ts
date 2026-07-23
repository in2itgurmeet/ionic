import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexService } from '../../service/index-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-details',
  imports: [IonicModule, CommonModule, RouterLink],
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  isDisabled = true;
  activeTab: number = 1;
  invoiceData: any[] = [];
  constructor(private indexService: IndexService) { }

  setActiveTab(tabIndex: number, filter: string): void {
    this.activeTab = tabIndex;
    this.getInvoiceList(filter);
  }

  ngOnInit() {
    this.getInvoiceList("all");
  }

  getInvoiceList(filter: any) {
    this.indexService.getInvoiceList().subscribe({
      next: (res) => {
        let backendList = res.body?.data || [];
        let data = backendList.map((item: any) => ({
          ...item,
          customer: item.customer?.name || 'STL Group',
          mobile: item.customer?.mobile || '+91 9999999999',
          total: item.total?.final || item.total?.gross || 0,
          paid: item.total?.paid || 0,
          dueDate: item.dueDate || new Date().toISOString().split('T')[0]
        }));

        this.invoiceData =
          filter === 'all'
            ? data
            : data.filter((item: any) => this.getStatus(item).type === filter);

      }
    });
  }

  getStatus(inv: any) {
    const today = new Date();
    const due = new Date(inv.dueDate);
    const out = inv.total - inv.paid;

    if (out <= 0) {
      return {
        text: 'Paid',
        type: 'paid',
        cls: 'badge-success',
        dis: true
      };
    }

    const days = Math.floor(
      Math.abs(today.getTime() - due.getTime()) / 86400000
    );

    return today > due
      ? {
        text: `Overdue ${days} Days`,
        type: 'overdue',
        cls: 'badge-danger',
        dis: false
      }
      : {
        text: `Due ${days} Days`,
        type: 'due',
        cls: 'badge-primary',
        dis: false
      };
  }

}
