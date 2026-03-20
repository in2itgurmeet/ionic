import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateorderComponent } from './createorder.component';

const routes: Routes = [
  {
    path:'',
    component:CreateorderComponent
  }
]

@NgModule({
  declarations: [CreateorderComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),IonicModule
  ]
})
export class CrateOrderModulePTL { }
