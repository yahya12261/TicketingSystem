import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridColumn } from '../../Interfaces/GridColumn';
import { IRule } from '../../Interfaces/Rule';
import { IUser } from '../../Interfaces/User';
import { InputType } from '../../enums/InputTypes';
import { OptionList } from '../../helpers/OptionList';
import { RuleService } from '../../services/RuleService/rule.service';
import { UserService } from '../../services/UserService/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../services/ToastService/toast.service';

@Component({
  selector: 'app-user-rule-dialog',
  templateUrl: './user-rule-dialog.component.html',
  styleUrls: ['./user-rule-dialog.component.css']
})
export class UserRuleDialogComponent implements
OnInit{
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  @Input() user !:IUser;
  @Output() closeClicked = new EventEmitter<void>();
  onAddApi = false;
  apiId!:number;
  pages!:IRule[];
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
      searchableField: false,
      selectQueryName: 'id',
      isOrderByField: false,
      searchOperation: 'EQUAL',
    },
    {
      header: 'تعريف',
      visible: true,
      field: 'arabicLabel',
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: 'arabicLabel',
      isOrderByField: false,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: ' اسم الصلاحية',
      visible: true,
      field: 'name',
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: 'name',
      isOrderByField: false,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'Route',
      visible: false,
      field: 'route',
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: 'route',
      isOrderByField: false,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'code',
      visible: false,
      field: 'code',
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: 'code',
      isOrderByField: false,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'METHODTYPE',
      visible: true,
      field: 'methodType',
      type: InputType.LIST,
      searchableField: false,
      selectQueryName: 'methodType',
      isOrderByField: false,
      searchOperation: 'BEGIN_WITH',
      searchList : OptionList.getListByName("methodType"),
      searchListField: (list: any) => {
        return list.arabicLabel;
      },
    },
    {
      header: 'METHODNAME',
      visible: false,
      field: 'methodName',
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: 'methodName',
      isOrderByField: false,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'TYPE',
      visible: true,
      field: 'type',
      type: InputType.LIST,
      searchableField: false,
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
      visible: false,
      field: 'note',
      type: InputType.TEXT,
      searchableField: false,
      selectQueryName: 'note',
      isOrderByField: false,
    },
  ];
  constructor(
    public service: RuleService,
    public userService:UserService,
    private spinner: NgxSpinnerService,
    private toast : ToastService
  ) {

  }
  ngOnInit(): void {
    //console.log(this.user)
    this.path = "/getUserRules/"+this.user.id;
  }
  onSearch(query: string) {
  }


  getApis():void{
    this.spinner.show();
      this.service.getAll(1,500,"","").subscribe(
        data => {
          this.pages = data.data.data;
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
    this.userService.addUserRule(Number(this.user.id),this.apiId).subscribe(data=>{
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
    this.userService.deleteUserRule(Number(this.user.id),apiId).subscribe(data=>{
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
