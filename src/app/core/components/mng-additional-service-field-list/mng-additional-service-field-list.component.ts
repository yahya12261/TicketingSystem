import { Component } from '@angular/core';
import { InputType } from '../../enums/InputTypes';
import { AdditionalServiceFieldListService } from '../../services/AdditionalServiceFieldListService/additional-service-field-list.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IAdditionalServiceList } from '../../Interfaces/AdditionalServiceList';
import { GridColumn } from '../../Interfaces/GridColumn';
import { GridUtils } from '../../helpers/GridUtils';

@Component({
  selector: 'app-mng-additional-service-field-list',
  templateUrl: './mng-additional-service-field-list.component.html',
  styleUrls: ['./mng-additional-service-field-list.component.css']
})
export class MngAdditionalServiceFieldListComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAdd = false;
  onEdit = false;
  up = false;
  update:IAdditionalServiceList= {} as IAdditionalServiceList
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
      header: ' اسم الخدمة',
      visible: true,
      field: 'arabicLabel',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'arabicLabel',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: 'الحقل',
      visible: true,
      field: 'field',
      format: (value: any) => {
        return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: 'field.id',
      isOrderByField: true,
    },
    {
      header: 'القائمة',
      visible: true,
      field: 'dsc',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'dsc',
      isOrderByField: true,
    },
  ];
  constructor(
    public service:AdditionalServiceFieldListService,
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

  onOpenEditModal(row:IAdditionalServiceList) {
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
