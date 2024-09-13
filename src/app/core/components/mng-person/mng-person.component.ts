import { Component } from '@angular/core';
import { IPerson } from '../../Interfaces/Person';
import { InputType } from '../../enums/InputTypes';
import { DateUtils } from '../../helpers/DateUtils';
import { GridColumn } from '../../Interfaces/GridColumn';
import { PersonService } from '../../services/personService/person.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridUtils } from '../../helpers/GridUtils';
import { OptionList } from '../../helpers/OptionList';
import { getNationalitiesArray, Nationality } from '../../helpers/Nationality';
import { getNationalityInArabic } from '../../enums/Nationality';

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
      field: "firstAr",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "firstAr",
      isOrderByField: false,
      searchOperation: "BEGIN_WITH"
    },
    {
      header: "اسم الأب",
      visible: true,
      field: "middleAr",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "middleAr",
      isOrderByField: false,
      searchOperation: "BEGIN_WITH"
    },
    {
      header: "الشهرة",
      visible: true,
      field: "lastAr",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "lastAr",
      isOrderByField: false,
      searchOperation: "BEGIN_WITH"
    },
    {
      header: "First Name",
      visible: false,
      field: "firstEn",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "firstEn",
      isOrderByField: false,
      searchOperation: "BEGIN_WITH"
    },
    {
      header: "Middle Name",
      visible: false,
      field: "middleEn",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "middleEn",
      isOrderByField: false,
      searchOperation: "BEGIN_WITH"
    },
    {
      header: "Last Name",
      visible: false,
      field: "lastEn",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "lastEn",
      isOrderByField: false,
      searchOperation: "BEGIN_WITH"
    },
    {
      header: "تاريخ الولادة",
      visible: true,
      field: "dob",
      type: InputType.DATE,
      searchableField: false,
      selectQueryName: "dob",
      format(value) {
        return DateUtils.formatDate(value);
    },
      isOrderByField: false
    },
    {
      header: "الجنس",
      visible: true,
      field: "Gender",
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: "Gender",
      isOrderByField: false,
      searchOperation:"BEGIN_WITH",
      searchListField: (list: any) => {
        return list.value;
      },
      format(value) {
          return value=='male'?"ذكر":"انثى";
      },
      searchList:OptionList.getListByName('gender')
    },
    {
      header: "رقم البطاقة",
      visible: false,
      field: "LID",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "LID",
      isOrderByField: false
    },
    {
      header: "الجنسية",
      visible: true,
      field: "nationality",
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: "nationality",
      isOrderByField: false,

      searchListField: (list: any) => {
        return list.value;
      },
      format(value) {
          return getNationalityInArabic(value)
      },
      searchList:getNationalitiesArray(),
      searchOperation:"EQUAL",
    },
    {
      header: "المحافظة",
      visible: true,
      field: "governmentAddress",
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: "governmentAddress.id",
      isOrderByField: false,
      searchListField: (list: any) => {
        return list.id;
      },
      format(value) {
        return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      searchOperation:"EQUAL",
    },
    {
      header: "القضاء",
      visible: true,
      field: "cazaAddress",
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: "cazaAddress",
      isOrderByField: false,
      searchListField: (list: any) => {
        return list.id;
      },
      format(value) {
        return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      searchOperation:"EQUAL",
    },
    {
      header: "البلدة",
      visible: true,
      field: "townAddress",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "townAddress",
      isOrderByField: false
    },
    {
      header: "رقم الهاتف",
      visible: true,
      field: "phoneNumber",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "phoneNumber",
      isOrderByField: false
    },
    {
      header: "رمز الدولة",
      visible: false,
      field: "phoneNumberCode",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "phoneNumberCode",
      isOrderByField: false
    },
    {
      header: "من الطاقم الطبي",
      visible: true,
      field: "fromMedical",
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: "fromMedical",
      isOrderByField:false,
      format(value) {
        return value?"نعم":"كلا";
      },
    },
    {
      header: "لديه جهة ضامنة",
      visible: true,
      field: "haveInsurance",
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: "haveInsurance",
      isOrderByField:false,
      format(value) {
        return value?"نعم":"كلا";
      },
    },
    {
      header: "اسم الجهة الضامنة",
      visible: true,
      field: "insuranceName",
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: "insuranceName",
      isOrderByField: false
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

