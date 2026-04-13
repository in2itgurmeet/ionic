import { AuthComponent } from './theams/auth/auth.component';
import { HomeComponent } from './theams/home/home.component';
import { Routes } from '@angular/router';
import { ConsignorThemeComponent } from './theams/consignor-theme/consignor.component';
import { DriverTheameComponent } from './theams/driver-theame/driver-theame.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./feature/auth/auth-module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'indexpage',
    component: ConsignorThemeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./feature/indexpage/indexpage.module').then(m => m.IndexpageModule)
      }
    ]
  },
  {
    path: 'getOrder',
    component: DriverTheameComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./feature/driver/driver-module').then(m => m.DriverModule)
      }
    ]
  }
];
