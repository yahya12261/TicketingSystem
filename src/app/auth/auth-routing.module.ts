import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthComponent } from './components/auth/auth.component';



const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
