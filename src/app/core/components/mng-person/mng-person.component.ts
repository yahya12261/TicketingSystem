import { Component } from '@angular/core';
import { IPerson } from '../../Interfaces/Person';
import { InputType } from '../../enums/InputTypes';
import { DateUtils } from '../../helpers/DateUtils';
import { GridColumn } from '../../Interfaces/GridColumn';
import { PersonService } from '../../services/personService/person.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mng-person',
  templateUrl: './mng-person.component.html',
  styleUrls: ['./mng-person.component.css']
})
export class MngPersonComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAdd = false;
  onEdit = false;
  up = false;
  update:IPerson = {} as IPerson
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
            action: () => this.onOpenEditModal(value),
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
      header: "الأسم الأول",
      visible: true,
      field: "firstAr",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "firstAr",
      isOrderByField: true,
      searchOperation: "BEGIN_WITH"
    },
    {
      header: "الأسم الأوسط",
      visible: true,
      field: "middleAr",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "middleAr",
      isOrderByField: true,
      searchOperation: "BEGIN_WITH"
    },
    {
      header: "الأسم الأخير",
      visible: true,
      field: "lastAr",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "lastAr",
      isOrderByField: true,
      searchOperation: "BEGIN_WITH"
    },
    {
      header: "First Name",
      visible: true,
      field: "firstEn",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "firstEn",
      isOrderByField: true,
      searchOperation: "BEGIN_WITH"
    },
    {
      header: "Middle Name",
      visible: true,
      field: "middleEn",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "middleEn",
      isOrderByField: true,
      searchOperation: "BEGIN_WITH"
    },
    {
      header: "Last Name",
      visible: true,
      field: "lastEn",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "lastEn",
      isOrderByField: true,
      searchOperation: "BEGIN_WITH"
    },
    {
      header: "تاريخ الولادة",
      visible: true,
      field: "dob",
      type: InputType.DATE,
      searchableField: false,
      selectQueryName: "dob",
      isOrderByField: true
    },
    {
      header: "الجنس",
      visible: true,
      field: "gender",
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: "gender",
      isOrderByField: true
    },
    {
      header: "رقم البطاقة",
      visible: true,
      field: "LID",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "LID",
      isOrderByField: true
    },
    {
      header: "الجنسية",
      visible: true,
      field: "nationality",
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: "nationality",
      isOrderByField: true
    },
    {
      header: "المحافظة",
      visible: true,
      field: "governmentAddress",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "governmentAddress",
      isOrderByField: true
    },
    {
      header: "القضاء",
      visible: true,
      field: "cazaAddress",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "cazaAddress",
      isOrderByField: true
    },
    {
      header: "البلدة",
      visible: true,
      field: "townAddress",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "townAddress",
      isOrderByField: true
    },
    {
      header: "رقم الهاتف",
      visible: true,
      field: "phoneNumber",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "phoneNumber",
      isOrderByField: true
    },
    {
      header: "رمز الدولة",
      visible: true,
      field: "phoneNumberCode",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "phoneNumberCode",
      isOrderByField: true
    },
    {
      header: "من الطاقم الطبي",
      visible: true,
      field: "fromMedical",
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: "fromMedical",
      isOrderByField:false
    },
    {
      header: "لديه جهة ضامنة",
      visible: true,
      field: "haveInsurance",
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: "haveInsurance",
      isOrderByField:false
    },
    {
      header: "اسم الجهة الضامنة",
      visible: true,
      field: "insuranceName",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "insuranceName",
      isOrderByField: true
    },
    {
      header: 'ملاحظات',
      visible: true,
      field: 'note',
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: 'note',
      isOrderByField: false,
    },
  ];
  constructor(
    public service:PersonService,
    private spinner: NgxSpinnerService
  ) {}
  onSearch(query: string) {}
  onOpenAddModal() {
    if(!this.onAdd){
    this.spinner.show();
    this.onAdd = true;
    }
  }

  onCloseAddModal(){
    this.spinner.hide();
    this.onAdd = false;
  }

  onOpenEditModal(row:IPerson) {
    this.update = row;
    if(!this.onEdit){
    this.spinner.show();
    this.up=true;
    this.onEdit = true;}
  }

  onCloseEditModal(){
    this.spinner.hide();
    this.onEdit = false;
  }
}

