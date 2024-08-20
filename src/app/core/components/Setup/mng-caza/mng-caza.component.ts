import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InputType } from 'src/app/core/enums/InputTypes';
import { DateUtils } from 'src/app/core/helpers/DateUtils';
import { GridColumn } from 'src/app/core/Interfaces/GridColumn';
import { IGovernment } from 'src/app/core/Interfaces/Locations/Government';
import { GovernmentService } from 'src/app/core/services/Locations/governmentService/government.service';

@Component({
  selector: 'app-mng-caza',
  templateUrl: './mng-caza.component.html',
  styleUrls: ['./mng-caza.component.css']
})
export class MngCazaComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
  onAddGov = false;
  onEditGov = false;
  up = false;
  updateGov:IGovernment = {}as IGovernment
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
    public governmentService: GovernmentService,
    private spinner: NgxSpinnerService
  ) {}
  onSearch(query: string) {}
  onOpenAddGovModal() {
    if(!this.onAddGov){
    this.spinner.show();
    this.onAddGov = true;
    }
  }
  onCloseAddDepModal(){
    this.spinner.hide();
    this.onAddGov = false;
  }

  onOpenEditDepModal(row:IGovernment) {
    this.updateGov = row;
    if(!this.onEditGov){
    this.spinner.show();
    this.up=true;
    this.onEditGov = true;}
  }

  onCloseEditDepModal(){
    this.spinner.hide();
    this.onEditGov = false;
  }
}
