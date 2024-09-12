import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/auth/Auth-Services/ToastService/toast.service';
import { IPosition } from 'src/app/core/Interfaces/Position';
import { IService } from 'src/app/core/Interfaces/Service';
import { IStatus } from 'src/app/core/Interfaces/Status/Status';
import { IStatusFlow } from 'src/app/core/Interfaces/Status/StatusFlow';
import { CustomInputComponent } from 'src/app/core/layout/custom-input/custom-input.component';
import { PositionService } from 'src/app/core/services/positionService/position.service';
import { ServiceService } from 'src/app/core/services/ServiceService/service.service';
import { StatusFlowService } from 'src/app/core/services/statusService/status-flow.service';
import { StatusService } from 'src/app/core/services/statusService/status.service';

@Component({
  selector: 'app-status-flow-dialog',
  templateUrl: './status-flow-dialog.component.html',
  styleUrls: ['../../baseStyle/style.css']
})
export class StatusFlowDialogComponent  implements
OnInit{
  myForm!: FormGroup;
  arabicNameControl!: FormControl;
  statusControl!: FormControl;
  serviceControl!: FormControl;
  nextStatusControl!: FormControl;
  positionControl!: FormControl;
  noteControl!: FormControl;
  statusFlow :IStatusFlow = {} as IStatusFlow;
  allStatuses:IStatus[] = []
  allServices:IService[] = []
  allPositions:IPosition[] = []
  //nextStatus:IStatus[] = []
  @Input() isUpdate !:"true"|"false";
  @Input() input !:IStatusFlow;
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private serviceService:ServiceService,private formBuilder: FormBuilder,private statusFlowService:StatusFlowService,private positionService:PositionService,private statusService:StatusService,private toast:ToastService){

  }
  ngOnInit(): void {
    this.spinner.show();
    this.fetchAllStatuses();
    this.fetchAllServices();
    this.fetchAllPositions();
    this.createForm(this.input);
    console.log(this.input)
    if(this.isUpdate){
    }

    this.spinner.hide();
  }

  onClose(){
    this.closeClicked.emit();
  }
  // setInvalidInputBorder() {
  //     if (this.name?.status==='INVALID') {
  //       this.name.setErrors({ 'invalid': true });
  //     }
  //     if (this.arabicName?.status==='INVALID') {
  //       this.arabicName.setErrors({ 'invalid': true });
  //     }
  // }
  createForm(data?:IStatusFlow) {
    console.log(data)
    this.arabicNameControl = this.formBuilder.control((data)?data.arabicLabel:'', Validators.required);
    this.statusControl = this.formBuilder.control((data)?data.refStatus.id:'', Validators.required);
    this.noteControl = this.formBuilder.control((data)?data.note:'');
    this.serviceControl = this.formBuilder.control((data)?data.service?.id:'', Validators.required);
    this.nextStatusControl = this.formBuilder.control((data)?this.extractIds(data.nextStatuses):'', Validators.required);
    this.positionControl = this.formBuilder.control((data)?data.position?.id:'', Validators.required);
    this.myForm = this.formBuilder.group({
      arabicName: this.arabicNameControl,
      nextStatus:this.nextStatusControl,
      refStatus: this.statusControl,
      position: this.positionControl,
      service: this.serviceControl,
      note: this.noteControl,
    });
  }
  onUpdate(){
    this.spinner.show();
    this.statusFlow.id = this.input.id;
    this.statusFlow.note = this.myForm.value.note;
    this.statusFlow.refStatus = {id:this.myForm.value.refStatus}
    this.statusFlow.position = {id:this.myForm.value.position}
    this.statusFlow.service = {id:this.myForm.value.service}
    this.statusFlow.nextStatuses = this.getObjectArray();
    this.statusFlow.dsc=Math.random()+""
    this.statusFlowService.update(this.statusFlow).subscribe(result=>{
      if(result.success){
        this.spinner.hide();
        this.toast.showSuccess(result.message);
        this.onClose();
      }else{
        this.spinner.hide();
        this.toast.showError(result.message);
      }
    },error=>{
      this.spinner.hide();
      this.toast.showError(error.error.message);
    })
  }
  onSubmit() {
    this.spinner.show();
  this.customInputs.forEach((customInput) => customInput.onBlur());
  if (this.myForm.invalid) {
    // this.setInvalidInputBorder();
  } else {
    const body :IStatusFlow = {
      arabicLabel: this.myForm.value.arabicName,
      note:this.myForm.value.note,
      refStatus :{id:this.myForm.value.refStatus},
      position : {id:this.myForm.value.position},
      service : {id:this.myForm.value.service},
      nextStatuses: this.getObjectArray()
    }
    this.statusFlowService.create(body).subscribe(result=>{
      if(result.success){
        this.spinner.hide();
        this.toast.showSuccess("تمت الإضافة بنجاح");
        this.onClose();
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
    //fetchAllStatuses
    fetchAllStatuses(){
      this.statusService.getSelectOption().subscribe(data=>{
        if(data.success){
          this.allStatuses =  data.data;
        }
      })
    }
    //fetchAllServices
    fetchAllServices(){
      this.serviceService.getSelectOption().subscribe(data=>{
        if(data.success){
          this.allServices =  data.data;
        }
      })
    }
    //fetchAllPositions
    fetchAllPositions(){
      this.positionService.getSelectOption().subscribe(data=>{
        if(data.success){
          this.allPositions =  data.data;
        }
      })
    }

getObjectArray():IStatus[]{
  console.log(this.myForm.value.nextStatus);
  if(Array.isArray(this.myForm.value.nextStatus))
    return this.myForm.value.nextStatus.map((id:any) => ({ id: Number(id) }));
  return [];
}

 extractIds(objects: Array<IStatus>): number[] {
  return objects.map(obj => Number(obj.id));
}

    get nextStatus() {
      return this.myForm.get('nextStatus');
    }

  get arabicLabel() {
    return this.myForm.get('arabicLabel');
  }
  get refStatus() {
    return this.myForm.get('refStatus');
  }
  get note() {
    return this.myForm.get('note');
  }
  get position() {
    return this.myForm.get('position');
  }
  get service() {
    return this.myForm.get('service');
  }
}
