import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuleService } from '../../services/RuleService/rule.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OptionList } from '../../helpers/OptionList';
import { InputType } from '../../enums/InputTypes';
import { DateUtils } from '../../helpers/DateUtils';
import { GridColumn } from '../../Interfaces/GridColumn';
import { IRule } from '../../Interfaces/Rule';
import { ToastService } from '../../services/ToastService/toast.service';

@Component({
  selector: 'app-page-api-dialog',
  templateUrl: './page-api-dialog.component.html',
  styleUrls: ['./page-api-dialog.component.css']
})
export class PageApiDialogComponent  implements
OnInit{
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  @Input() rule !:IRule;
  @Output() closeClicked = new EventEmitter<void>();
  onAddApi = false;
  apiId!:number;
  APIs!:IRule[];
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
        return [{
          label: 'حذف',
          action: () => this.deleteApi(value.id),
          visible: (item: any) => {
            return true;
          },
        },
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
    private spinner: NgxSpinnerService,
    private toast : ToastService
  ) {

  }
  ngOnInit(): void {
    console.log(this.rule)
    this.path = "/getPagesApis/"+this.rule.id;
  }
  onSearch(query: string) {
  }


  getApis():void{
    this.spinner.show();
      this.service.getAll(1,500,"?type=API&typeOP=EQUAL","").subscribe(
        data => {
          this.APIs = data.data.data;
          this.spinner.hide();
        },error=>{
          this.toast.showError(error.error.massage)
          this.spinner.hide();
        });
  }
  onAddApiToPage(){
    this.onAddApi = true;
    this.getApis();
  }
  addApi(){
    this.spinner.show();
    this.service.addPageApi(Number(this.rule.id),this.apiId).subscribe(data=>{
      if(data.success){
        this.toast.showSuccess(data.message)
        this.spinner.hide();
        this.onAddApi = false;
      }else{
        this.toast.showError(data.message)
        this.spinner.hide();
      }
    },error=>{
      this.toast.showError(error.error.message)
      this.spinner.hide();

    })
  }
  deleteApi(apiId:number){
    this.spinner.show();
    this.service.deletePageApi(Number(this.rule.id),apiId).subscribe(data=>{
      if(data.success){
        this.toast.showSuccess(data.message)
        this.spinner.hide();
        this.onAddApi = false;
      }else{
        this.toast.showError(data.message)
        this.spinner.hide();
      }
    },error=>{
      this.toast.showError(error.error.message)
      this.spinner.hide();

    })
  }


}
