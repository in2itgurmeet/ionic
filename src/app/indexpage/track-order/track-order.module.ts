import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TrackOrderComponent } from './track-order.component';
const routes :Routes=[
  {
    path:'',
    component:TrackOrderComponent
  }
]


@NgModule({
  declarations: [TrackOrderComponent],
  imports: [
    CommonModule,IonicModule,RouterModule.forChild(routes),ReactiveFormsModule,FormsModule
  ]
})
export class TrackOrderModule { }
