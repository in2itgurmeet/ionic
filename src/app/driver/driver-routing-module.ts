import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverDashbaordComponent } from './driver-dashbaord/driver-dashbaord.component';

const routes: Routes = [
  {
    path: '',
    component: DriverDashbaordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
