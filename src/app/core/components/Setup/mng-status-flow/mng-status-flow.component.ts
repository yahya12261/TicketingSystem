import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InputType } from 'src/app/core/enums/InputTypes';
import { DateUtils } from 'src/app/core/helpers/DateUtils';
import { GridUtils } from 'src/app/core/helpers/GridUtils';
import { GridColumn } from 'src/app/core/Interfaces/GridColumn';
import { IStatusFlow } from 'src/app/core/Interfaces/Status/StatusFlow';
import { StatusFlowService } from 'src/app/core/services/statusService/status-flow.service';

@Component({
  selector: 'app-mng-status-flow',
  templateUrl: './mng-status-flow.component.html',
  styleUrls: ['./mng-status-flow.component.css']
})
export class MngStatusFlowComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAdd = false;
  onEdit = false;
  up = false;
  update:IStatusFlow = {} as IStatusFlow
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
      header: 'المؤشر',
      visible: true,
      field: 'arabicLabel',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'arabicLabel',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'الخدمة',
      visible: true,
      field: 'service',
      type: InputType.LIST,
      searchableField: true,
      searchListField: (list: any) => {
        return list.id;
      },
      format(value) {
          return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      selectQueryName: 'service.id',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'الحالة',
      visible: true,
      field: 'refStatus',
      type: InputType.LIST,
      searchableField: true,
      searchListField: (list: any) => {
        return list.id;
      },
      format(value) {
          return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      selectQueryName: 'refStatus.id',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'المرتبة',
      visible: true,
      field: 'position',
      type: InputType.LIST,
      searchableField: true,
      searchListField: (list: any) => {
        return list.id;
      },
      format(value) {
          return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      selectQueryName: 'position.id',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'الحالات التالية',
      visible: true,
      field: 'nextStatuses',
      type: InputType.HTML,
      searchableField: false,
      format(value) {
          if(Array.isArray(value)){
            let result = "";
            value.forEach((status)=>{
              result +=`<li><a style='color:${status.color};'>${status.arabicLabel}</a></li><br>`;
            })
            return result;
          }
          return "";
      },
      selectQueryName: 'arabicLabel',
      isOrderByField: false,
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
    public service:StatusFlowService,
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

  onOpenEditModal(row:IStatusFlow) {
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
