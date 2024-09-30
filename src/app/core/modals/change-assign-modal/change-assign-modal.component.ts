import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPosition } from '../../Interfaces/Position';
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PositionService } from '../../services/positionService/position.service';
import { ToastService } from '../../services/ToastService/toast.service';
import { IPersonOperation } from '../../Interfaces/PersonOperation';
import { PersonOperationService } from '../../services/personOperationService/person-operation.service';
@Component({
  selector: 'app-change-assign-modal',
  templateUrl: './change-assign-modal.component.html',
  styleUrls: ['./change-assign-modal.component.css']
})
export class ChangeAssignModalComponent implements
OnInit{
  myForm!: FormGroup;
  assignToControl!: FormControl;

  @Output() closeClicked = new EventEmitter<void>();
  @Input() operation:IPersonOperation ={} as IPersonOperation;
    usersOptions:[] =[]
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private toast :ToastService,
    private positionService:PositionService,private service:PersonOperationService){

  }
  ngOnInit(): void {
    this.fetchAllPositons();
    this.createForm();
    this.spinner.hide();
  }
  onClose(){
    this.closeClicked.emit();
  }
  setInvalidInputBorder() {
      if (this.assigneTo?.status==='INVALID') {
        this.assigneTo.setErrors({ 'invalid': true });
      }
  }
  createForm() {
    this.assignToControl = this.formBuilder.control(undefined, Validators.required);
    // this.cazaControl = this.formBuilder.control((obj)?obj.government:'');
    this.myForm = this.formBuilder.group({
        assignTo:this.assignToControl
    });
  }
  onSubmit() {
    this.spinner.show();
  this.customInputs.forEach((customInput) => customInput.onBlur());
  if (this.myForm.invalid) {
    this.setInvalidInputBorder();
  } else {
    const data  = {
      operationId : this.operation.id ,
          userId :this.assignToControl.value
      }
    //console.log(data)
    this.service.changeAssign(data).subscribe(result=>{
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
fetchAllPositons(){
  this.positionService.getAvailbleUsers().subscribe(data=>{
    if(data.success){
      this.usersOptions =  data.data;
    }
  })
  }
  get assigneTo() {
    return this.myForm.get('assigneTo');
  }

}
