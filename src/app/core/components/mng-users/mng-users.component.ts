import { Component } from '@angular/core';
import { IUser } from '../../Interfaces/User';
import { InputType } from '../../enums/InputTypes';
import { GridUtils } from '../../helpers/GridUtils';
import { DateUtils } from '../../helpers/DateUtils';
import { GridColumn } from '../../Interfaces/GridColumn';
import { UserService } from '../../services/UserService/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PositionService } from '../../services/positionService/position.service';

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
    private positionService:PositionService
  ) {
    this.fetchAllPositions();
  }
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
      header: 'اسم المستخدم',
      visible: true,
      field: '',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: '',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
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
