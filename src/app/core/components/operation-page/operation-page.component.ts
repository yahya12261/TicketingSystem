import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonOperationService } from '../../services/personOperationService/person-operation.service';
import { IPersonOperation } from '../../Interfaces/PersonOperation';
import { getNationalityInArabic } from '../../enums/Nationality';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-operation-page',
  templateUrl: './operation-page.component.html',
  styleUrls: ['./operation-page.component.css']
})
export class OperationPageComponent implements OnInit{
  onChangeStatus=false
  onChangeAssign=false
  onAddChange=false
onOpenAddChanges(){this.onChangeAssign = false;this.onChangeStatus = false; this.onAddChange = true}
onOpenChangeStatus(){this.onChangeAssign = false;this.onChangeStatus = true; this.onAddChange = false}
onOpenChangeAssign(){this.onChangeAssign = true;this.onChangeStatus = false; this.onAddChange = false}
onCloseChangeStatus(){
  this.sevice.getFullOperation(Number(this.id)).subscribe(result=>{
    this.operationData = result.data
    //console.log(this.operationData)
  })
  this.onChangeAssign = false;this.onChangeStatus = false; this.onAddChange = false}
  id: string | null = null;
  operationData:IPersonOperation = {} as IPersonOperation;
  constructor(private route: ActivatedRoute,private sevice:PersonOperationService,     private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.sevice.getFullOperation(Number(this.id)).subscribe(result=>{
        this.operationData = result.data
        //console.log(this.operationData)
        this.spinner.hide();
      }) // Retrieve the 'id' from the route parameters
  });

  }

  getNationalityInArabic(value:any){
    return getNationalityInArabic(value);
  }

}
