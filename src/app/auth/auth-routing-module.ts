import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyLoginComponent } from './my-login/my-login.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { OTPComponent } from './otp/otp.component';
import { ResetPaswordComponent } from './reset-pasword/reset-pasword.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: MyLoginComponent },
  {
    path: 'Register',
    component: RegisterpageComponent,
  },
  {
    path: 'ForgetPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'SendOtp',
    component: OTPComponent,
  },
  {
    path: 'ResetPassword',
    component: ResetPaswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
