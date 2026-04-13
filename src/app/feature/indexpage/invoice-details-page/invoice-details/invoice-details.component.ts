import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from 'src/app/Service/api';
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
  constructor(private apiService: Api) { }

  setActiveTab(tabIndex: number, filter: string): void {
    this.activeTab = tabIndex;
    this.getInvoiceList(filter);
  }

  ngOnInit() {
    this.getInvoiceList("all");
  }

  getInvoiceList(filter: any) {
    this.apiService.getInvoiceData().subscribe({
      next: (res) => {
        let data = res.map((item: any) => ({
          ...item,
          status: this.getStatus(item)
        }));

        this.invoiceData =
          filter === 'all'
            ? data
            : data.filter((item: any) => item.status.type === filter);

      }
    });
  }

  getStatus(inv: any) {
    const today = new Date();
    const due = new Date(inv.dueDate);
    const out = inv.total - inv.paid;

    if (out === 0) {
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
