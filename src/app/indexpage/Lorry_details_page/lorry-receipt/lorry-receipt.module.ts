import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LorryReceiptComponent } from './lorry-receipt.component';

const routes :Routes=[
  {
    path:'',
    component:LorryReceiptComponent
  }
]


@NgModule({
  declarations: [LorryReceiptComponent],
  imports: [
    CommonModule,IonicModule,RouterModule.forChild(routes),
  ]
})
export class LorryReceiptModule {     }
