import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OrderDetailComponent } from './order-detail.component';

const routes: Routes = [
  {
    path:'',
    component:OrderDetailComponent
  }
]

@NgModule({
  declarations: [OrderDetailComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),IonicModule
  ]
})
export class OrderDetailModule { }
