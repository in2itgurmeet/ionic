import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashbaord/dashbaord.module').then(m => m.DashbaordModule)
  },
  {
    path: 'CreateOrderFTl',
    loadChildren: () => import('./crate-order_ftl/crate-order.module').then(m => m.CrateOrderModuleFTL)
  }, {
    path: 'PtlBooking',
    loadChildren: () => import('./ptl-bookin/ptl-bookin.module').then(m => m.PtlBookinModule)
  }, {
    path: 'FtlBooking',
    loadChildren: () => import('./ftl-bookin/ftl-bookin.module').then(m => m.FtlBookinModule)
  }, {
    path: 'CreateOrderPTl',
    loadChildren: () => import('./crate-order_ptl/crate-order.module').then(m => m.CrateOrderModulePTL)
  }, {
    path: 'Orderdetails',
    loadChildren: () => import('./order-detail/order-detail.module').then(m => m.OrderDetailModule)
  },
  {
    path: 'Booked',
    loadChildren: () => import('./booked/booked.module').then(m => m.BookedModule)
  }, {
    path: 'Loory-receipt',
    loadChildren: () => import('./Lorry_details_page/lorry-receipt/lorry-receipt.module').then(m => m.LorryReceiptModule)
  },
  {
    path: 'Proof-delivery',
    loadChildren: () => import('./Lorry_details_page/proof-of-delivery/proof-of-delivery.module').then(m => m.ProofOfDeliveryModule)
  },
  {
    path: 'Shiping-lable',
    loadChildren: () => import('./Lorry_details_page/shipping-lable/shipping-lable.module').then(m => m.ShippingLableModule)
  },
  {
    path: 'All-Product',
    loadChildren: () => import('./allproduct/allproduct.module').then(m => m.AllproductModule)
  },
  {
    path: 'Tracking-Order',
    loadChildren: () => import('./track-order/track-order.module').then(m => m.TrackOrderModule)
  },
  {
    path: 'Feedback',
    loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule)
  },
  {
    path: 'Invoice-details',
    loadChildren: () => import('./invoice-details-page/invoice-details/invoice-details.module').then(m => m.InvoiceDetailsModule)
  }, {
    path: 'Invoice-Bill',
    loadChildren: () => import('./invoice-details-page/invoice-bill/invoice-bill.module').then(m => m.InvoiceBillModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexpageRoutingModule { }
