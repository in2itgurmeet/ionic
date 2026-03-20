import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PtlBookinComponent } from './ptl-bookin.component';

const routes :Routes=[
  {
    path:'',
    component:PtlBookinComponent
  }
]


@NgModule({
  declarations: [PtlBookinComponent],
  imports: [
    CommonModule,IonicModule,RouterModule.forChild(routes),ReactiveFormsModule,FormsModule
  ]
})
export class PtlBookinModule { }
