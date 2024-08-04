import { Component } from '@angular/core';
import { IRule } from '../../Interfaces/Rule';
import { GridColumn } from '../../Interfaces/GridColumn';
import { InputType } from '../../enums/InputTypes';
import { DateUtils } from '../../helpers/DateUtils';
import { RuleService } from '../../services/RuleService/rule.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OptionList } from '../../helpers/OptionList';

@Component({
  selector: 'app-mng-rule',
  templateUrl: './mng-rule.component.html',
  styleUrls: ['./mng-rule.component.css']
})
export class MngRuleComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAddRule = false;
  onEditRule = false;
  onShowPageApis = false;
  up = false;
  selectedRule!:string
  updateRule:IRule = {}as IRule
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
            action: () => this.onOpenEditRuleModal(value),
            visible: (item: any) => {
              return true;
            },
          },
          {
            label: 'الصلاحيات',
            action: () => this.onOpenPagesApi(value.id+""),
            visible: (item: any) => {
              return item.type ==="page";
            },
          }
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
      header: 'تعريف',
      visible: true,
      field: 'arabicLabel',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'arabicLabel',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: ' اسم الصلاحية',
      visible: true,
      field: 'name',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'name',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'Route',
      visible: true,
      field: 'route',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'route',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'code',
      visible: true,
      field: 'code',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'code',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'METHODTYPE',
      visible: true,
      field: 'methodType',
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: 'methodType',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
      searchList : OptionList.getListByName("methodType"),
      searchListField: (list: any) => {
        return list.arabicLabel;
      },
    },
    {
      header: 'METHODNAME',
      visible: true,
      field: 'methodName',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'methodName',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'TYPE',
      visible: true,
      field: 'type',
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: 'type',
      isOrderByField: false,
      searchOperation: 'BEGIN_WITH',
      searchList : OptionList.getListByName("ruleType"),
      searchListField: (list: any) => {
        return list.arabicLabel;
      },
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
    public service: RuleService,
    private spinner: NgxSpinnerService
  ) {

  }
  onSearch(query: string) {}
  onOpenAddRuleModal() {
    if(!this.onAddRule){
    this.spinner.show();
    this.onAddRule = true;
    }
  }

  onCloseAddRuleModal(){
    this.spinner.hide();
    this.onAddRule = false;
  }
  ngInit(){

  }
  onOpenEditRuleModal(row:IRule) {
    this.updateRule = row;
    if(!this.onEditRule){
    this.spinner.show();
    this.up=true;
    this.onEditRule = true;}
  }

  onCloseEditRuleModal(){
    this.spinner.hide();
    this.onEditRule = false;
  }

  onOpenPagesApi(id:string){
    console.log(id)
    this.selectedRule = id;
    this.onShowPageApis = true;
  }
  onClosePagesApi(){
    this.onShowPageApis = false;
    this.selectedRule = "";
  }
}
