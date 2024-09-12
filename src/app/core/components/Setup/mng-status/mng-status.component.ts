import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InputType } from 'src/app/core/enums/InputTypes';
import { DateUtils } from 'src/app/core/helpers/DateUtils';
import { GridColumn } from 'src/app/core/Interfaces/GridColumn';
import { IStatus } from 'src/app/core/Interfaces/Status/Status';
import { GovernmentService } from 'src/app/core/services/Locations/governmentService/government.service';
import { StatusService } from 'src/app/core/services/statusService/status.service';

@Component({
  selector: 'app-mng-status',
  templateUrl: './mng-status.component.html',
  styleUrls: ['./mng-status.component.css']
})

export class MngStatusComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAdd = false;
  onEdit = false;
  up = false;
  update:IStatus = {} as IStatus
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
      header: ' اسم الحالة',
      visible: true,
      field: 'arabicLabel',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'arabicLabel',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: ' لون الحالة',
      visible: true,
      style: (value: any) => {
        return { color: value  };
      },
      field: 'color',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'color',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
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
    public statusService:StatusService,
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

  onOpenEditModal(row:IStatus) {
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
