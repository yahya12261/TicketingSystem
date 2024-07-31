import { Component } from '@angular/core';
import { GridColumn } from '../../Interfaces/GridColumn';
import { BaseService } from '../../services/BaseService/base.service';
import { DateUtils } from '../../helpers/DateUtils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent {
  showConfirmationDialog = false;
  confirmationMessage = 'Are you sure you want to proceed?';

  constructor() { }
  openConfirmationDialog(): void {
    this.showConfirmationDialog = true;
  }

  onYesClicked(): void {
    // Perform the desired action
    this.showConfirmationDialog = false;
  }

  onNoClicked(): void {
    // Handle cancellation
    this.showConfirmationDialog = false;
  }

  gridColumns: GridColumn[] = [
    // { header: 'الرقم التسلسلي',visible:true, field: 'id' },

    // { header: 'تاريخ البدء',visible:true, field: 'createdAt', format: (value: any) => { return DateUtils.formatDateTime(value);}},

    // { header:"الأسم الثلاثي",visible:true,field:"Person",format: (value: any) => {return `${value.firstName} ${value.middleName} ${value.lastName}`}}
    // ,
    // { header:"تاريخ الولادة",visible:true,field:"Person",format: (value: any) => {return DateUtils.formatDate(value.dob)}}
  ];

  // Handle search event
  onSearch(query: string) {
    // Perform search logic here
    console.log('Search query:', query);
  }
}
