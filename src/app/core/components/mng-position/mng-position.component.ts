import { Component } from '@angular/core';
import { PositionService } from '../../services/positionService/position.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridColumn } from '../../Interfaces/GridColumn';
import { InputType } from '../../enums/InputTypes';
import { DateUtils } from '../../helpers/DateUtils';
import { GridUtils } from '../../helpers/GridUtils';
import { DepartmentService } from '../../services/departmentService/department.service';
import { IDepartment } from '../../Interfaces/Department';
import { IPosition } from '../../Interfaces/Position';

@Component({
  selector: 'app-mng-position',
  templateUrl: './mng-position.component.html',
  styleUrls: ['./mng-position.component.css']
})
export class MngPositionComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAddPos = false;
  onEditPos = false;
  selectedPosition = {}as IPosition;
  updatePos:IPosition = {} as IPosition;
  accessModal = false;
  constructor(
    public service: PositionService,
    private spinner: NgxSpinnerService,
    private departmentService:DepartmentService
  ) {
    this.fetchAllDepartments();
  }
  gridColumns: GridColumn[] =[
    {
      header: 'إجراءات',
      visible: true,
      field: 'id',
      searchableField: false,
      actions: (value: any) => {
        return [
          {
            label: 'تعديل',
            action: () => this.onOpenEditPosModal(value),
            visible: (item: any) => {
              return true;
            },
          },
          {
            label: 'الصلاحيات',
            action: () => this.onOpenAccessModal(value),
            visible: (item: any) => {
              return true;
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
      header: 'الإختصاص',
      visible: true,
      field: 'department',
      searchListField: (list: any) => {
        return list.id;
      },
      format(value) {
          return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      type: InputType.LIST,
      searchableField: true,
      selectQueryName: 'department.id',
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
  ]
  onSearch(query: string) {
  }

  onOpenAddPosModal() {
    if(!this.onAddPos){
    this.spinner.show();
    this.onAddPos = true;}
  }

  onCloseAddPosModal(){
    this.spinner.hide();
    this.onAddPos = false;
  }

  onOpenEditPosModal(row:IPosition) {
    this.updatePos = row;
    if(!this.onEditPos){
    this.spinner.show();
    this.onEditPos = true;}
  }

  onCloseEditPosModal(){
    this.spinner.hide();
    this.onEditPos = false;
  }

  fetchAllDepartments(){
      this.departmentService.getSelectOption().subscribe(data=>{
        if(data.success){
          this.gridColumns[4].searchList =  data.data;
        }
      })
  }
  onOpenAccessModal(rule:IPosition){
    console.log(rule)
    this.selectedPosition = rule;
    this.accessModal = true;
  }
  onCloseAccessModal(){
    this.accessModal = false;
    this.selectedPosition = {} ;
  }


}
