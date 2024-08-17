import { Component, ViewChild } from '@angular/core';
import { IUser } from '../../Interfaces/User';
import { InputType } from '../../enums/InputTypes';
import { GridUtils } from '../../helpers/GridUtils';
import { DateUtils } from '../../helpers/DateUtils';
import { GridColumn } from '../../Interfaces/GridColumn';
import { UserService } from '../../services/UserService/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PositionService } from '../../services/positionService/position.service';
import { OptionList } from '../../helpers/OptionList';
import { DepartmentService } from '../../services/departmentService/department.service';
import { Toast } from 'ngx-toastr';
import { ToastService } from '../../services/ToastService/toast.service';
import { GridComponent } from '../../layout/grid/grid.component';
import { User } from 'src/app/auth/Auth-Services/interfaces/app.interface';

@Component({
  selector: 'app-mng-users',
  templateUrl: './mng-users.component.html',
  styleUrls: ['./mng-users.component.css'],
})
export class MngUsersComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAddUser = false;
  onEditUser = false;
  selectedUser = {} as IUser;
  updateUser: IUser = {} as IUser;
  accessModal = false;
  @ViewChild(GridComponent, { static: true }) childComponent!: GridComponent<User>;
  constructor(
    public service: UserService,
    private spinner: NgxSpinnerService,
    private positionService: PositionService,
    private departmentService: DepartmentService,
    private toastService: ToastService
  ) {
    this.fetchAllPositions();
    this.fetchAllDepartments();
  }

  //   "uuid": "17cadc46-abb9-4415-be14-b30c3f34ce9c",
  //   "type": "user",
  //   "id": 103,
  //   "createdAt": "2024-08-06T17:58:53.173Z",
  //   "updatedAt": "2024-08-06T17:58:53.000Z",
  //   "deletedAt": null,
  //   "version": 2,
  //   "dsc": null,
  //   "arabicLabel": null,
  //   "isActive": true,
  //   "note": null,
  //   "first": "sdfdsf",
  //   "middle": "sdfsda",
  //   "last": "fsdf",
  //   "email": "asdasd@adsd.asd",
  //   "username": "fsdfsdfdsfsdfsdasdf",
  //   "phoneNumber": "sdf",
  //   "isAdmin": false,
  //   "changePassword": true,
  //   "invalidLoginAttempts": 0,
  //   "lastLogin": null,
  //   "createdBy": null,
  //   "position": {
  //       "uuid": "8ecc0130-78ec-4763-a79f-176866987204",
  //       "type": "position",
  //       "id": 1,
  //       "createdAt": "2024-07-19T14:27:16.680Z",
  //       "updatedAt": "2024-07-19T14:27:16.680Z",
  //       "deletedAt": null,
  //       "version": 1,
  //       "dsc": null,
  //       "arabicLabel": "مسؤول فريق",
  //       "isActive": true,
  //       "note": null,
  //       "name": "PMO"
  //   }
  // "department": {
  //                         "uuid": "28cbc053-897e-4c63-92b4-7ebbf02b5e29",
  //                         "type": "",
  //                         "id": 1,
  //                         "createdAt": "2024-07-13T03:46:44.911Z",
  //                         "updatedAt": "2024-07-31T00:26:34.000Z",
  //                         "deletedAt": null,
  //                         "version": 2,
  //                         "dsc": null,
  //                         "arabicLabel": "فريق الدعم التقني",
  //                         "isActive": true,
  //                         "note": null,
  //                         "name": "task force"
  // },

  gridColumns: GridColumn[] = [
    {
      header: 'إجراءات',
      visible: true,
      field: 'id',
      searchableField: false,
      actions: (value: any) => {
        return [
          {
            label: 'تعديل',
            action: () => this.onOpenEditUserModal(value),
            visible: (item: any) => {
              return true;
            },
          },
          {
            label: 'طلب تغير كلمة السر',
            action: () => this.activeChangePassword(value.uuid),
            visible: (item: any) => {
              return !item.changePassword;
            },
          },
          {
            label: 'إلغاء تغير كلمة المرور',
            action: () => this.activeChangePassword(value.uuid),
            visible: (item: any) => {
              return item.changePassword;
            },
          },
          {
            label: 'تفعيل',
            action: () => this.activeUnActive(value.uuid),
            visible: (item: any) => {
              return !item.isActive;
            },
          },
          {
            label: 'تعطيل ',
            action: () => this.activeUnActive(value.uuid),
            visible: (item: any) => {
              return item.isActive;
            },
          },
          {
            label: 'الصلاحيات ',
            action: () => this.onOpenAccessModal(value),
            visible: (item: any) => {
              return true;
            },
          },
        ];
      },
      isOrderByField: false,
    },
    {
      header: 'تاريخ الإضافة',
      visible: true,
      field: 'createdAt',
      type: InputType.DATE,
      format: (value: any) => {
        return DateUtils.formatDateTime(value);
      },
      searchableField: true,
      selectQueryName: 'createdAt',
      isOrderByField: true,
      searchOperation: 'EQUAL',
    },
    {
      header: 'التسلسلي',
      visible: true,
      field: 'id',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'id',
      isOrderByField: true,
      searchOperation: 'EQUAL',
    },
    {
      header: 'الأسم الثلاثي',
      visible: true,
      field: 'arabicLabel',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'arabicLabel',

      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'اخر دخول',
      visible: true,
      field: 'lastLogin',
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: 'lastLogin',
      format: (value) => {
        return `${value ? DateUtils.getFromDate(value) : 'لم يتم التسجيل بعد'}`;
      },
      isOrderByField: true,
      searchOperation: 'EQUAL',
    },
    {
      header: 'كلمة السر',
      visible: true,
      field: 'changePassword',
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: 'changePassword',
      style: (value: any) => {
        return { color: value ? 'red' : 'green' };
      },
      format: (value) => {
        return `${value ? 'تغير' : 'نشط'}`;
      },
      isOrderByField: true,
      searchOperation: 'EQUAL',
    },
    {
      header: 'اسم الدخول',
      visible: true,
      field: 'username',
      type: InputType.TEXT,
      style: (value: any) => {
        return { color: 'gray' };
      },
      searchableField: true,
      selectQueryName: 'username',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'الحالة',
      visible: true,
      field: 'isActive',
      type: InputType.LIST,
      format(value) {
        return value ? 'مفعل' : 'غير مفعل';
      },
      style: (value: any) => {
        return { color: value ? 'green' : 'red' };
      },
      searchList: OptionList.getListByName('activeInactive'),
      searchListField: (list: any) => {
        return list.id;
      },
      searchableField: true,
      selectQueryName: 'isActive',
      isOrderByField: true,
      searchOperation: 'EQUAL',
    },
    {
      header: 'الإختصاص',
      visible: true,
      field: 'position',
      type: InputType.LIST,
      format(value) {
        return `${value.department.arabicLabel}`;
      },
      searchListField: (list: any) => {
        return list.id;
      },
      searchableField: true,
      selectQueryName: 'department.id',
      isOrderByField: true,
      searchOperation: 'EQUAL',
    },
    {
      header: 'المرتبة',
      visible: true,
      field: 'position',
      type: InputType.LIST,
      format(value) {
        return `${value.arabicLabel}`;
      },
      searchListField: (list: any) => {
        return list.id;
      },
      searchableField: true,
      selectQueryName: 'position.id',
      isOrderByField: true,
      searchOperation: 'EQUAL',
    },

    // {
    //   header: 'اسم المستخدم',
    //   visible: true,
    //   field: 'middle',
    //   type: InputType.TEXT,
    //   searchableField: true,
    //   selectQueryName: 'middle',
    //   isOrderByField: true,
    //   searchOperation: 'BEGIN_WITH',
    // },
    // {
    //   header: 'الإختصاص',
    //   visible: true,
    //   field: 'department',
    //   searchListField: (list: any) => {
    //     return list.id;
    //   },
    //   format(value) {
    //       return GridUtils.getDataFromObject(value,"arabicLabel");
    //   },
    //   type: InputType.LIST,
    //   searchableField: true,
    //   selectQueryName: 'department.id',
    //   isOrderByField: false,
    // },
    // {
    //   header: 'ملاحظات',
    //   visible: true,
    //   field: 'note',
    //   type: InputType.TEXT,
    //   searchableField: false,
    //   selectQueryName: 'note',
    //   isOrderByField: false,
    // },
  ];
  onSearch(query: string) {

  }
  onOpenAddUserModal() {
    if (!this.onAddUser) {
      this.spinner.show();
      this.onAddUser = true;
    }
  }
  onCloseAddUserModal() {
    this.spinner.hide();
    this.onAddUser = false;
  }
  onOpenEditUserModal(row: IUser) {
    this.updateUser = row;
    if (!this.onEditUser) {
      this.spinner.show();
      this.onEditUser = true;
    }
  }
  onCloseEditUserModal() {
    this.spinner.hide();
    this.onEditUser = false;
  }
  fetchAllPositions() {
    this.positionService.getSelectOption().subscribe((data) => {
      if (data.success) {
        this.gridColumns[9].searchList = data.data;
      }
    });
  }
  fetchAllDepartments() {
    this.departmentService.getSelectOption().subscribe((data) => {
      if (data.success) {
        this.gridColumns[8].searchList = data.data;
      }
    });
  }
  activeChangePassword(uuid: string) {
    this.spinner.show();
    this.service.activateDeactivateChangePassword(uuid).subscribe((data) => {
      if (data.success) {
        this.spinner.hide();
        this.toastService.showSuccess(data.message);
        this.childComponent.clearFilter();
      }else{
        this.spinner.hide();
        this.toastService.showError(data.message);
      }
    },(error)=>{
      this.spinner.hide();
      this.toastService.showError(error.message.message);
    });
  }

  activeUnActive(uuid: string) {
    this.spinner.show();
    this.service.activateDeactivate(uuid).subscribe((data) => {
      if (data.success) {
        this.spinner.hide();
        this.toastService.showSuccess(data.message);
        this.childComponent.clearFilter();
      }else{
        this.spinner.hide();
        this.toastService.showError(data.message);
      }
    },(error)=>{
      this.spinner.hide();
      this.toastService.showError(error.message.message);
    });
  }

  onOpenAccessModal(user:IUser){
    console.log(user)
    this.selectedUser = user;
    this.accessModal = true;
  }
  onCloseAccessModal(){
    this.accessModal = false;
    this.selectedUser = {} ;
  }
}
