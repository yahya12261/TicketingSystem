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
import { DateFormatDirective  } from './decorator/date.directive';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { AdminComponent } from './components/admin/admin.component';
import { MngDepartmentComponent } from './components/mng-department/mng-department.component';
import { DepartmentService } from './services/departmentService/department.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DepartmentDialogComponent } from './modals/department-dialog/department-dialog.component';
import { CustomInputComponent } from './layout/custom-input/custom-input.component';
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
