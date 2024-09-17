import { Component } from '@angular/core';
import { GridColumn } from '../../Interfaces/GridColumn';
import { InputType } from '../../enums/InputTypes';
import { DateUtils } from '../../helpers/DateUtils';
import { OptionList } from '../../helpers/OptionList';
import { GridUtils } from '../../helpers/GridUtils';
import { PersonService } from '../../services/personService/person.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../services/ToastService/toast.service';
import { PersonOperationService } from '../../services/personOperationService/person-operation.service';
import { StatusService } from '../../services/statusService/status.service';
import { UserService } from '../../services/UserService/user.service';
import { ServiceService } from '../../services/ServiceService/service.service';
import { IPerson } from '../../Interfaces/Person';
import { IPersonOperation } from '../../Interfaces/PersonOperation';

@Component({
  selector: 'app-mng-person-operation',
  templateUrl: './mng-person-operation.component.html',
  styleUrls: ['./mng-person-operation.component.css']
})
export class MngPersonOperationComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAddFast = false;
  onAddOld = false;
  onChangeStatus = false;
  person:IPerson = {}as IPerson
  personOperation :IPersonOperation = {} as IPersonOperation;
  gridColumns: GridColumn[] = [
    {
      header: 'إجراءات',
      visible: true,
      field: 'id',
      searchableField: false,
      actions: (value: any) => {
        return [
          {
            label: 'تغير الحالة',
            action: () => this.onOpenChangeStatus(value),
            visible: (item: any) => {
              return true;
            },
          },
          // {
          //   label: 'إضافة خدمة',
          //   action: () => this.onOpenAddService(value),
          //   visible: (item: any) => {
          //     return true;
          //   },
          // },
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
        return DateUtils.getFromDate(value);
      },
      searchableField: true,
      selectQueryName: 'createdAt',
      isOrderByField: false,
      searchOperation: 'EQUAL',
    },
    {
      header: 'التسلسلي',
      visible: true,
      field: 'id',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'id',
      isOrderByField: false,
      searchOperation: 'EQUAL',
    },
    {
      header: "الأسم الأول",
      visible: true,
      field: "person",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "person.firstAr",
      isOrderByField: false,
      searchOperation: "BEGIN_WITH",
      format(value) {
        return GridUtils.getDataFromObject(value,"firstAr");
      },
    },
    {
      header: "اسم الأب",
      visible: true,
      field: "person",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "person.middleAr",
      isOrderByField: false,
      searchOperation: "BEGIN_WITH",
      format(value) {
        return GridUtils.getDataFromObject(value,"middleAr");
      },
    },
    {
      header: "الشهرة",
      visible: true,
      field: "person",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "person.lastAr",
      isOrderByField: false,
      searchOperation: "BEGIN_WITH",
      format(value) {
        return GridUtils.getDataFromObject(value,"lastAr");
      },
    },
    {
      header: "تاريخ الولادة",
      visible: true,
      field: "person",
      type: InputType.DATE,
      searchableField: false,
      selectQueryName: "person.dob",
      format(value) {
        return DateUtils.formatDateAndCalculateAge(GridUtils.getDataFromObject(value,"dob"));
      },
      isOrderByField: false
    },
    {
      header: "رقم الهاتف",
      visible: true,
      field: "person",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "person.phoneNumber",
      isOrderByField: false,
      format(value) {
        return GridUtils.getDataFromObject(value,"phoneNumber");
      },
    },
    {
      header: "الخدمة",
      visible: true,
      field: "service",
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: "service.id",
      isOrderByField: false,
      format(value) {
        return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      searchListField: (list: any) => {
        return list.id;
      },
      searchOperation:"EQUAL",
    },
    {
      header: "الحالة",
      visible: true,
      field: "status",
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: "status.id",
      isOrderByField: false,
      format(value) {
        return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      style: (value: any) => {
        return { color:value.color+"" };
      },
      searchListField: (list: any) => {
        return list.id;
      },
      searchOperation:"EQUAL",
    },
    {
      header: "متابع الحالة",
      visible: true,
      field: "assignTo",
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: "assignTo.id",
      isOrderByField: false,

      format(value) {

        return GridUtils.getDataFromObject(value,"arabicLabel");

      },

      searchListField: (list: any) => {
        return list.id;
      },

      searchOperation:"EQUAL",
    },
    {
      header: "مشرف الحالة",
      visible: true,
      field: "reporter",
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: "operationReporter.id",
      isOrderByField: false,
      format(value) {
        return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      searchListField: (list: any) => {
        return list.id;
      },
      searchOperation:"EQUAL",
    },
    {
      header: 'ملاحظات',
      visible: false,
      field: 'note',
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: 'note',
      isOrderByField: false,
    },
  ];
  constructor(
    private serviceService:ServiceService,
    private statusService : StatusService,
    private UserService:UserService,
    public service : PersonOperationService,
    private spinner: NgxSpinnerService,
    private toast:ToastService
  ) {
    this.fetchServiceList();
    this.fetchStatusList();
    this.fetchUsersList();
  }
  onSearch(query: string) {}

  onOpenAddModal(){

  }

  onOpenFastService(){
    this.spinner.show();
    this.onAddOld = false;
    this.onAddFast = true;
    this.spinner.hide();
  }

  onCloseFastService(){
    this.onAddFast = false;
  }

  onOpenOldService(person:IPerson){

    this.spinner.show();
    this.onAddFast = false;
    this.onAddOld = true;
    this.person  = person;
    this.spinner.hide();
  }

  onCloseOldService(){
    this.onAddOld = false;
  }

  onOpenChangeStatus(op:IPersonOperation){
    this.onAddFast = false;
    this.onAddOld = false;
    this.onChangeStatus = true;
    this.personOperation = op;
  }
  onCloseChangeStatus(){
    this.onChangeStatus = false;
    this.personOperation = {} as IPersonOperation;
  }
  fetchUsersList(){
    this.spinner.show();
    this.UserService.getSelectOption().subscribe(data=>{
      this.gridColumns[10].searchList = data.data;
      this.gridColumns[11].searchList = data.data;
    })
    this.spinner.hide();
  }
  fetchServiceList(){
    this.spinner.show();
    this.serviceService.getSelectOption().subscribe(data=>{
      this.gridColumns[8].searchList = data.data;
    })
    this.spinner.hide();
  }


  fetchStatusList(){
    this.spinner.show();
    this.statusService.getSelectOption().subscribe(data=>{
      this.gridColumns[9].searchList = data.data;
    })
    this.spinner.hide();
  }
}
