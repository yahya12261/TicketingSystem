import { Component } from '@angular/core';
import { IAdditionalServiceFields } from '../../Interfaces/AdditionalServiceFields';
import { GridColumn } from '../../Interfaces/GridColumn';
import { InputType } from '../../enums/InputTypes';
import { AdditionalServiceFieldListService } from '../../services/AdditionalServiceFieldListService/additional-service-field-list.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridUtils } from '../../helpers/GridUtils';
import { AdditionalServiceFieldService } from '../../services/AdditionalServiceFieldService/additional-service-field.service';

@Component({
  selector: 'app-mng-additional-fields',
  templateUrl: './mng-additional-fields.component.html',
  styleUrls: ['./mng-additional-fields.component.css']
})
export class MngAdditionalFieldsComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAdd = false;
  onEdit = false;
  up = false;
  update:IAdditionalServiceFields= {} as IAdditionalServiceFields
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
      header: 'الخدمة',
      visible: true,
      field: 'service',
      format: (value: any) => {
        return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: 'service.id',
      isOrderByField: true,
    },
    {
      header: 'النوع',
      visible: true,
      field: 'fieldType',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'fieldType',
      isOrderByField: true,
    },
    {
      header: 'إجباري',
      visible: true,
      field: 'isRequired',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'isRequired',
      isOrderByField: true,
    },
  ];
  constructor(
    public service:AdditionalServiceFieldService,
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

  onOpenEditModal(row:IAdditionalServiceFields) {
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

