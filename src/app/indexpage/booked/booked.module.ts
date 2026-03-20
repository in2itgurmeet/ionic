import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BookedComponent } from './booked.component';
const routes: Routes = [
  {
    path:'',
    component:BookedComponent
  }
]

@NgModule({
  declarations: [BookedComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),IonicModule
  ]
})
export class BookedModule { }
