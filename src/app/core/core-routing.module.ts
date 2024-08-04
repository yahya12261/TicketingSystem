import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoreComponent } from './components/core/core.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '../auth/Auth-Services/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { MngDepartmentComponent } from './components/mng-department/mng-department.component';
import { MngPositionComponent } from './components/mng-position/mng-position.component';
import { MngRuleComponent } from './components/mng-rule/mng-rule.component';

const routes: Routes = [
  {
    path: 'core',
    component: CoreComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'department', component: MngDepartmentComponent },
      { path: 'position', component: MngPositionComponent },
      { path: 'rule', component: MngRuleComponent },
      { path: 'admin', component: AdminComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
