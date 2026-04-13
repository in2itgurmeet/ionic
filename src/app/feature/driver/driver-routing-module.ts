import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverDashbaordComponent } from './driver-dashbaord/driver-dashbaord.component';
import { SettingsComponent } from './settings/settings.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: DriverDashbaordComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'myOrders', component: MyOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
