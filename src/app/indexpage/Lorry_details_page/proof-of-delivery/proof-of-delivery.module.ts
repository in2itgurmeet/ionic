import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProofOfDeliveryComponent } from './proof-of-delivery.component';

const routes :Routes=[
  {
    path:'',
    component:ProofOfDeliveryComponent
  }
]


@NgModule({
  declarations: [ProofOfDeliveryComponent],
  imports: [
    CommonModule,IonicModule,RouterModule.forChild(routes)
  ]
})
export class ProofOfDeliveryModule { }
