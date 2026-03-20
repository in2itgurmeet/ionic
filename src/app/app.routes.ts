import { IndexpageComponent } from './indexpage/indexpage.component';
import { AuthComponent } from './theams/auth/auth.component';
import { HomeComponent } from './theams/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'indexPage',
    component: IndexpageComponent,
    children: [
      {
        path: 'IndexPage',
        loadChildren: () => import('./indexpage/indexpage.module').then(m => m.IndexpageModule)
      }
    ]
  }
];
