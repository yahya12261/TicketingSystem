import { Component, OnInit } from '@angular/core';
import { InputType } from '../../enums/InputTypes';
import { DateUtils } from '../../helpers/DateUtils';
import { GridColumn } from '../../Interfaces/GridColumn';
import { GridUtils } from '../../helpers/GridUtils';
import { PositionService } from '../../services/positionService/position.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../services/ToastService/toast.service';

@Component({
  selector: 'app-mng-assigners-and-assigned',
  templateUrl: './mng-assigners-and-assigned.component.html',
  styleUrls: ['./mng-assigners-and-assigned.component.css']
})
export class MngAssignersAndAssignedComponent implements OnInit{
  path="";
  ngOnInit(): void {
    this.path = "/assign-perms/";
  }
  constructor(public service : PositionService,private spinner: NgxSpinnerService,private toast:ToastService){

  }
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAdd = false;
  onEdit = false;

  gridColumns: GridColumn[] = [
    {
      header: 'إجراءات',
      visible: true,
      field: 'id',
      searchableField: false,
      actions: (value: any) => {
        return [
          {
            label: 'حذف',
            action: () => this.onDelete(value),
            visible: (item: any) => {
              return true;
            },
          },
        ];
      },
      isOrderByField: false,
    },
    {
      header: 'الموجه',
      visible: true,
      field: 'assigner',
      type: InputType.DATE,
      format: (value: any) => {
        return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      searchableField: false,
      isOrderByField: false,
      searchOperation: 'EQUAL',
    },
    {
      header: 'الموجه له',
      visible: true,
      field: 'assigned',
      format: (value: any) => {
        return GridUtils.getDataFromObject(value,"arabicLabel");
      },
      type: InputType.TEXT,
      searchableField: false,
      isOrderByField: false,
      searchOperation: 'EQUAL',
    },
  ];
  onSearch(query: string) {}
  onOpenAddAssigners(){
    this.onAdd = true;
  }
  onCloseAddAssigners(){
    this.onAdd = false;
  }
  onDelete(value:any){
    this.spinner.show();
  const data= {assigner:value.assigner.id,assigned:value.assigned.id};
    this.service.addAssigners(data).subscribe(result=>{
      if(result.success){
        this.spinner.hide();
        this.toast.showSuccess("تمت الإضافة بنجاح");
      }else{
        this.spinner.hide();
        this.toast.showError(result.message);
      }
    },error=>{
      this.spinner.hide();
      this.toast.showError(error.error.message);
    })
  }
}
