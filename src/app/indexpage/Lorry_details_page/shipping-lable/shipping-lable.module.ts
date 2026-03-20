import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShipingLableComponent } from './shiping-lable.component';

const routes :Routes=[
  {
    path:'',
    component:ShipingLableComponent
  }
]


@NgModule({
  declarations: [ShipingLableComponent],
  imports: [
    CommonModule,IonicModule,RouterModule.forChild(routes)
  ]
})
export class ShippingLableModule { }
