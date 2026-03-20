import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/translate-loader';
import { AllProductComponent } from './all-product.component';
const routes: Routes = [
  {
    path:'',
    component:AllProductComponent
  }
]

@NgModule({
  declarations: [AllProductComponent],
  imports: [
    CommonModule,TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild(routes),IonicModule
  ]
})
export class AllproductModule { }
