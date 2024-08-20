import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CoreComponent } from './components/core/core.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterLinkActiveExactDirective } from './components/core/appRouterLinkActiveExact.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './modals/confirmation-dialog/confirmation-dialog.component';
import { GridComponent } from './layout/grid/grid.component';
import { BaseService } from './services/BaseService/base.service';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import {Ng2TelInputModule} from 'ng2-tel-input';
import { AdminComponent } from './components/admin/admin.component';
import { MngDepartmentComponent } from './components/mng-department/mng-department.component';
import { DepartmentService } from './services/departmentService/department.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DepartmentDialogComponent } from './modals/department-dialog/department-dialog.component';
import { CustomInputComponent } from './layout/custom-input/custom-input.component';
import { MngPositionComponent } from './components/mng-position/mng-position.component';
import { PositionDialogComponent } from './modals/position-dialog/position-dialog.component';
import { MngRuleComponent } from './components/mng-rule/mng-rule.component';
import { RuleDialogComponent } from './modals/rule-dialog/rule-dialog.component';
import { PageApiDialogComponent } from './modals/page-api-dialog/page-api-dialog.component';
import { PositionRuleDialogComponent } from './modals/position-rule-dialog/position-rule-dialog.component';
import { MngUsersComponent } from './components/mng-users/mng-users.component';
import { UserDialogComponent } from './modals/user-dialog/user-dialog.component';
import { CustomSelectComponent } from './layout/custom-select/custom-select.component';
import { UserRuleDialogComponent } from './modals/user-rule-dialog/user-rule-dialog.component';
import { PermissionCheckDirective } from './directive/permission-check.directive';
import { DateFormatDirective } from './directive/date.directive';
import { MngGovernmentComponent } from './components/Setup/mng-government/mng-government.component';
import { MngCazaComponent } from './components/Setup/mng-caza/mng-caza.component';
import { MngTownComponent } from './components/Setup/mng-town/mng-town.component';
import { GovernmentDialogComponent } from './modals/government-dialog/government-dialog.component';
import { CazaDialogComponent } from './modals/Setup/caza-dialog/caza-dialog.component';
@NgModule({
  declarations: [
    CoreComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    RouterLinkActiveExactDirective,
    ConfirmationDialogComponent,
    GridComponent,
    DateFormatDirective,
    AdminComponent,
    MngDepartmentComponent,
    DepartmentDialogComponent,
    CustomInputComponent,
    MngPositionComponent,
    PositionDialogComponent,
    MngRuleComponent,
    RuleDialogComponent,
    PageApiDialogComponent,
    PositionRuleDialogComponent,
    MngUsersComponent,
    UserDialogComponent,
    CustomSelectComponent,
    UserRuleDialogComponent,
    PermissionCheckDirective,
    MngGovernmentComponent,
    MngCazaComponent,
    MngTownComponent,
    GovernmentDialogComponent,
    CazaDialogComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ReactiveFormsModule,
    CoreRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    FormsModule,
    DatePipe,
    Ng2TelInputModule


  ],
  providers: [{
     provide: BaseService,  useClass:DepartmentService
    }],

})
export class CoreModule {}
