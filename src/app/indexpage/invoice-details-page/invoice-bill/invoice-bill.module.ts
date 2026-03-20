import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InvoiceBillComponent } from './invoice-bill.component';

const routes :Routes=[
  {
    path:'',
    component:InvoiceBillComponent
  }
]


@NgModule({
  declarations: [InvoiceBillComponent],
  imports: [
    CommonModule,IonicModule,RouterModule.forChild(routes)
  ]
})
export class InvoiceBillModule { }
