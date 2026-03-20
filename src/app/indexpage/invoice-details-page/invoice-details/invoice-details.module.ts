import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InvoiceDetailsComponent } from './invoice-details.component';

const routes :Routes=[
  {
    path:'',
    component:InvoiceDetailsComponent
  }
]


@NgModule({
  declarations: [InvoiceDetailsComponent],
  imports: [
    CommonModule,IonicModule,RouterModule.forChild(routes)
  ]
})
export class InvoiceDetailsModule { }
