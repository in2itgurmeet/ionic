import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from 'src/app/Service/api';

@Component({
  selector: 'app-invoice-details',
  imports: [IonicModule, CommonModule],
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  isDisabled = true;
  activeTab: number = 1;
  invoiceData: any[] = [];
  constructor(private apiService: Api) { }

  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }
  ngOnInit() {
    this.getInvoiceList()
  }

  getInvoiceList() {
    this.apiService.getInvoiceData().subscribe({
      next: (res) => {
        this.invoiceData = res
      }
    })

  }
  getStatus(inv: any) {
    const today = new Date();
    const due = new Date(inv.dueDate);
    const out = inv.total - inv.paid;

    if (out === 0) return { text: 'Paid', cls: 'text-success', dis: true };

    const days = Math.floor(Math.abs(today.getTime() - due.getTime()) / 86400000);

    return today > due
      ? { text: `Overdue ${days} Days`, cls: 'text-danger', dis: false }
      : { text: `Due ${days} Days`, cls: 'text-primary', dis: false };
  }

}
