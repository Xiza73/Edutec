import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { NewPasswordComponent } from './page/new-password/new-password.component';
import { PasswordRecoveryComponent } from './page/password-recovery/password-recovery.component';
import { RegisterComponent } from './page/register/register.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'password-recovery',
        component: PasswordRecoveryComponent
      },
      {
        path: 'new-password/:code',
        component: NewPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
