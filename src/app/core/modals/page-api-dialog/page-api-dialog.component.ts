import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuleService } from '../../services/RuleService/rule.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OptionList } from '../../helpers/OptionList';
import { InputType } from '../../enums/InputTypes';
import { DateUtils } from '../../helpers/DateUtils';
import { GridColumn } from '../../Interfaces/GridColumn';

@Component({
  selector: 'app-page-api-dialog',
  templateUrl: './page-api-dialog.component.html',
  styleUrls: ['./page-api-dialog.component.css']
})
export class PageApiDialogComponent  implements
OnInit{
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  @Input() ruleId !:string;
  @Output() closeClicked = new EventEmitter<void>();
  onClose(){
    this.closeClicked.emit();
  }
  path!:string;
  gridColumns: GridColumn[] = [
    {
      header: 'إجراءات',
      visible: true,
      field: 'id',
      searchableField: false,
      actions: (value: any) => {
        return [
        ];
      },
      isOrderByField: false,
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
  ngOnInit(): void {
    console.log(this.ruleId)
    this.path = "/getPagesApis/"+this.ruleId;
  }
  onSearch(query: string) {


  }

}
