import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InputType } from 'src/app/core/enums/InputTypes';
import { DateUtils } from 'src/app/core/helpers/DateUtils';
import { GridUtils } from 'src/app/core/helpers/GridUtils';
import { GridColumn } from 'src/app/core/Interfaces/GridColumn';
import { ICaza } from 'src/app/core/Interfaces/Locations/Caza';
import { IGovernment } from 'src/app/core/Interfaces/Locations/Government';
import { CazaService } from 'src/app/core/services/Locations/cazaService/caza.service';
import { GovernmentService } from 'src/app/core/services/Locations/governmentService/government.service';

@Component({
  selector: 'app-mng-caza',
  templateUrl: './mng-caza.component.html',
  styleUrls: ['./mng-caza.component.css']
})
export class MngCazaComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAdd = false;
  onEdit = false;
  up = false;
  update:ICaza = {}as ICaza
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
      header: ' اسم القضاء',
      visible: true,
      field: 'arabicLabel',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'arabicLabel',
      isOrderByField: true,
      searchOperation: 'BEGIN_WITH',
    },
    {
      header: ' اسم القضاء',
      visible: true,
      field: 'government',
      searchListField: (list: any) => {
        return list.id;
      },
      format(value) {
          return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: 'government.id',
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
    private governmentService:GovernmentService,
    public cazaService:CazaService,
    private spinner: NgxSpinnerService
  ) {
    this.fetchAllGovernments();
  }
  onSearch(query: string) {}

  fetchAllGovernments(){
    this.governmentService.getSelectOption().subscribe(data=>{
      if(data.success){
        this.gridColumns[4].searchList =  data.data;
      }
    })
    }
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

  onOpenEditModal(row:IGovernment) {
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
