import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoreComponent } from './components/core/core.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '../auth/Auth-Services/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { MngDepartmentComponent } from './components/mng-department/mng-department.component';
import { MngPositionComponent } from './components/mng-position/mng-position.component';
import { MngRuleComponent } from './components/mng-rule/mng-rule.component';
import { MngUsersComponent } from './components/mng-users/mng-users.component';
import { MngGovernmentComponent } from './components/Setup/mng-government/mng-government.component';
import { MngCazaComponent } from './components/Setup/mng-caza/mng-caza.component';
import { MngTownComponent } from './components/Setup/mng-town/mng-town.component';
import { MngStatusComponent } from './components/Setup/mng-status/mng-status.component';
import { MngServiceComponent } from './components/mng-service/mng-service.component';
import { MngStatusFlowComponent } from './components/Setup/mng-status-flow/mng-status-flow.component';
import { MngPersonComponent } from './components/mng-person/mng-person.component';

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
      { path: 'users', component: MngUsersComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'setup/government', component:MngGovernmentComponent  },
      { path: 'setup/caza', component:MngCazaComponent  },
      { path: 'setup/town', component:MngTownComponent },
      { path: 'setup/status', component:MngStatusComponent },
      { path: 'setup/service', component:MngServiceComponent },
      { path: 'setup/status-flow', component:MngStatusFlowComponent },
      { path: 'person', component:MngPersonComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
