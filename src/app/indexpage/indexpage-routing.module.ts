import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashbaord/dashboard.component';
import { PtlBookinComponent } from './ptl-bookin/ptl-bookin.component';
import { FtlbookinComponent } from './ftl-bookin/ftlbookin.component';
import { CreateorderComponentPtl } from './crate-order_ptl/createorder.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { BookedComponent } from './booked/booked.component';
import { LorryReceiptComponent } from './Lorry_details_page/lorry-receipt/lorry-receipt.component';
import { ProofOfDeliveryComponent } from './Lorry_details_page/proof-of-delivery/proof-of-delivery.component';
import { ShipingLableComponent } from './Lorry_details_page/shipping-lable/shiping-lable.component';
import { AllProductComponent } from './allproduct/all-product.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { InvoiceDetailsComponent } from './invoice-details-page/invoice-details/invoice-details.component';
import { InvoiceBillComponent } from './invoice-details-page/invoice-bill/invoice-bill.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { CreateorderComponentFtl } from './crate-order_ftl/createorder.component';

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
    path: 'createOrderFTl',
    component: CreateorderComponentFtl,
  },
  {
    path: 'ptlBooking',
    component: PtlBookinComponent,
  },
  {
    path: 'ftlBooking',
    component: FtlbookinComponent,
  },
  {
    path: 'createOrderPTl',
    component: CreateorderComponentPtl,
  },
  {
    path: 'order-details/:id',
    component: OrderDetailComponent,
  },
  {
    path: 'booked',
    component: BookedComponent,
  },
  {
    path: 'loory-receipt',
    component: LorryReceiptComponent,
  },
  {
    path: 'proof-delivery',
    component: ProofOfDeliveryComponent,
  },
  {
    path: 'shiping-lable',
    component: ShipingLableComponent,
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
    path: 'invoice-Bill',
    component: InvoiceBillComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexpageRoutingModule { }
