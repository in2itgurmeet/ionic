import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashbaord/dashboard.component';
import { bookinComponent } from './booking/booking.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { BookedComponent } from './booked/booked.component';
import { AllProductComponent } from './allproduct/all-product.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { InvoiceDetailsComponent } from './invoice-details-page/invoice-details/invoice-details.component';
import { InvoiceBillComponent } from './invoice-details-page/invoice-bill/invoice-bill.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { CreateorderComponentPtl } from './crate-order/createorder.component';
import { LorryDeatilsComponent } from './Lorry_details_page/lorry-deatils/lorry-deatils.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'booking',
    component: bookinComponent,
  },
  {
    path: 'createOrder',
    component: CreateorderComponentPtl,
  },
  {
    path: 'order-details/:id',
    component: OrderDetailComponent,
  },
  {
    path: 'booked/:id',
    component: BookedComponent,
  },
  {
    path: 'all-product',
    component: AllProductComponent,
  },
  {
    path: 'tracking-Order/:id',
    component: TrackOrderComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'invoice-details',
    component: InvoiceDetailsComponent,
  },
  {
    path: 'invoice-Bill/:id',
    component: InvoiceBillComponent,
  },
  {
    path: 'lorry-details/:id',
    component: LorryDeatilsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexpageRoutingModule { }
