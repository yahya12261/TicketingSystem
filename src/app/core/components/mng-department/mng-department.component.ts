import { Component } from '@angular/core';
import { DepartmentService } from '../../services/departmentService/department.service';
import { GridColumn } from '../../Interfaces/GridColumn';
import { InputType } from '../../enums/InputTypes';
import { DateUtils } from '../../helpers/DateUtils';
import { NgxSpinnerService } from 'ngx-spinner';
import { IDepartment } from '../../Interfaces/Department';

@Component({
  selector: 'app-mng-department',
  templateUrl: './mng-department.component.html',
  styleUrls: ['./mng-department.component.css'],
})
export class MngDepartmentComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAddDep = false;
  onEditDep = false;
  up = false;
  updateDep:IDepartment = {}as IDepartment
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
            action: () => this.onOpenEditDepModal(value),
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
      selectQueryName: 'arabicLabel',
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
      header: ' اسم الإختصاص',
      visible: true,
      field: 'arabicLabel',
      type: InputType.TEXT,
      searchableField: true,
      selectQueryName: 'arabicLabel',
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
    public departmentService: DepartmentService,
    private spinner: NgxSpinnerService
  ) {}
  onSearch(query: string) {}
  onOpenAddDepModal() {
    if(!this.onAddDep){
    this.spinner.show();
    this.onAddDep = true;}
  }

  onCloseAddDepModal(){
    this.spinner.hide();
    this.onAddDep = false;
  }

  onOpenEditDepModal(row:IDepartment) {
    this.updateDep = row;
    if(!this.onEditDep){
    this.spinner.show();
    this.up=true;
    this.onEditDep = true;}
  }

  onCloseEditDepModal(){
    this.spinner.hide();
    this.onEditDep = false;
  }
}
