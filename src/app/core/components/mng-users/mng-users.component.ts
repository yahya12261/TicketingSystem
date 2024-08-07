import { Component } from '@angular/core';
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

@Component({
  selector: 'app-mng-users',
  templateUrl: './mng-users.component.html',
  styleUrls: ['./mng-users.component.css']
})
export class MngUsersComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAddUser = false;
  onEditUser = false;
  selectedUser = {}as IUser;
  updateUser:IUser = {} as IUser;
  accessModal = false
  constructor(
    public service: UserService,
    private spinner: NgxSpinnerService,
    private positionService:PositionService,
    private departmentService:DepartmentService,
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
// },
  gridColumns: GridColumn[] =[
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
          // {
          //   label: 'الصلاحيات',
          //   action: () => this.onOpenAccessModal(value),
          //   visible: (item: any) => {
          //     return true;
          //   },
          // }
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
      format :(value)=> {
        return `${value?DateUtils.getFromDate(value):"لم يتم التسجيل بعد"}`
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
      style:(value:any)=>{return {color:value?"red":"green"}},
      format :(value)=> {
        return `${value?"تغير":"نشط"}`
      },
      isOrderByField: true,
      searchOperation: 'EQUAL',
    },
    {
      header: 'اسم الدخول',
      visible: true,
      field: 'username',
      type: InputType.TEXT,
      style:(value:any)=>{return {color:"gray"}},
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
        return value?"مفعل":"غير مفعل"
      },
      style:(value:any)=>{return {color:value?"green":"red"}},
      searchList : OptionList.getListByName("activeInactive"),
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
        return `${value.department.arabicLabel}`
      },
      searchListField: (list: any) => {
        return list.id;
      },
      searchableField: true,
      selectQueryName: 'position.department.id',
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
  ]
  onSearch(query: string) {
  }

  onOpenAddUserModal() {
    if(!this.onAddUser){
    this.spinner.show();
    this.onAddUser = true;}
  }

  onCloseAddUserModal(){
    this.spinner.hide();
    this.onAddUser = false;
  }

  onOpenEditUserModal(row:IUser) {
    this.updateUser = row;
    if(!this.onEditUser){
    this.spinner.show();
    this.onEditUser = true;}
  }

  onCloseEditUserModal(){
    this.spinner.hide();
    this.onEditUser = false;
  }

  fetchAllPositions(){
      this.positionService.getSelectOption().subscribe(data=>{
        if(data.success){
          this.gridColumns[4].searchList =  data.data;
        }
      })
  }
  fetchAllDepartments(){
    this.departmentService.getSelectOption().subscribe(data=>{
      if(data.success){
        this.gridColumns[8].searchList =  data.data;
      }
    })
  }
  // onOpenAccessModal(rule:IPosition){
  //   console.log(rule)
  //   this.selectedPosition = rule;
  //   this.accessModal = true;
  // }
  // onCloseAccessModal(){
  //   this.accessModal = false;
  //   this.selectedPosition = {} ;
  // }


}
