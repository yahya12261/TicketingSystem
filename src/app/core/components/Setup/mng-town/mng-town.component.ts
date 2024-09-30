import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InputType } from 'src/app/core/enums/InputTypes';
import { DateUtils } from 'src/app/core/helpers/DateUtils';
import { GridUtils } from 'src/app/core/helpers/GridUtils';
import { GridColumn } from 'src/app/core/Interfaces/GridColumn';
import { ICaza } from 'src/app/core/Interfaces/Locations/Caza';
import { ITown } from 'src/app/core/Interfaces/Locations/Town';
import { CazaService } from 'src/app/core/services/Locations/cazaService/caza.service';
import { GovernmentService } from 'src/app/core/services/Locations/governmentService/government.service';
import { TownService } from 'src/app/core/services/Locations/townService/town.service';

@Component({
  selector: 'app-mng-town',
  templateUrl: './mng-town.component.html',
  styleUrls: ['./mng-town.component.css']
})
export class MngTownComponent {
  defaultOrder: string = 'orderBy=createdAt&order=DESC';
onAdd = false;
onEdit = false;
up = false;
update:ITown = {}as ITown
searchedGov :number= 0;
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
    header: ' اسم البلدة',
    visible: true,
    field: 'arabicLabel',
    type: InputType.TEXT,
    searchableField: true,
    selectQueryName: 'arabicLabel',
    isOrderByField: true,
    searchOperation: 'BEGIN_WITH',
  },
  {
    header: 'المحافظة',
    visible: true,
    field: 'caza',
    searchListField: (list: any) => {
      return list.id;
    },
    format(value) {
        return GridUtils.getDataFromObject(value,"government.arabicLabel");
    },
    type: InputType.LIST,
    searchableField: true,
    selectQueryName: 'government.id',
    isOrderByField: false,
    searchOperation: 'BEGIN_WITH',
    isComplicated:true
  },
  {
    header: 'القضاء',
    visible: true,
    field: 'caza',
    searchListField: (list: any) => {
      return list.id;
    },
    format(value) {
        return GridUtils.getDataFromObject(value,"arabicLabel");
    },
    type: InputType.LIST,
    searchableField: true,
    selectQueryName: 'caza.id',
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
  public townService:TownService,
  private cazaService:CazaService,
  private spinner: NgxSpinnerService
) {
  this.fetchAllCaza();
  this.fetchAllGovernments();
}
onSearch(query: string) {
  // if(this.searchedGov===0){
  //   this.searchedGov =Number(GridUtils.getValueFromQueryByParameterName(query,"government.id"));
  // }else{
  //   this.searchedGov =Number(GridUtils.getValueFromQueryByParameterName(query,"government.id"));
  //  this.gridColumns[5].searchValue = this.gridColumns[5].searchList[1].id;
  // }
  //console.log(query);
  this.fetchAllCaza();

}
fetchAllGovernments(){
  this.governmentService.getSelectOption().subscribe(data=>{
    if(data.success){
      this.gridColumns[4].searchList =  data.data;
    }
  })
  }

  fetchAllCaza(){
    this.spinner.show();
    this.cazaService.getSelectOptionByGovId(Number(this.gridColumns[4].searchValue)).subscribe(data=>{
      if(data.success){
        this.gridColumns[5].searchList =  data.data;
        this.spinner.hide();
      }
    })
    this.spinner.hide();
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

onOpenEditModal(row:ITown) {
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
