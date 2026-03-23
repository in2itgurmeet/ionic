import { AuthComponent } from './theams/auth/auth.component';
import { HomeComponent } from './theams/home/home.component';
import { Routes } from '@angular/router';
import { MainFeatureComponent } from './theams/main-feature/main-feature.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'indexpage',
    component: MainFeatureComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./indexpage/indexpage.module').then(m => m.IndexpageModule)
      }
    ]
  }
];
