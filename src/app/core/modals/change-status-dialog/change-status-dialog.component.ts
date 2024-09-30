
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../services/ToastService/toast.service';
import { PersonOperationService } from '../../services/personOperationService/person-operation.service';
import { IPersonOperation } from '../../Interfaces/PersonOperation';
import { UserService } from '../../services/UserService/user.service';
import { IPosition } from '../../Interfaces/Position';
import { IStatusFlow } from '../../Interfaces/Status/StatusFlow';
import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IStatus } from '../../Interfaces/Status/Status';
import { StatusFlowService } from '../../services/statusService/status-flow.service';

@Component({
  selector: 'app-change-status-dialog',
  templateUrl: './change-status-dialog.component.html',
  styleUrls: ['./change-status-dialog.component.css'],
})

export class ChangeStatusDialogComponent implements OnInit {
  myForm!: FormGroup;
  nextStatusControl!: FormControl;
  noteControl!: FormControl;
  @Output() closeClicked = new EventEmitter<void>();
  statusOption :IStatus[]= [];
  @Input() operation!: IPersonOperation;
  userPosition:IPosition = {} as IPosition;
  @ViewChildren(CustomInputComponent)
  customInputs!: QueryList<CustomInputComponent>;


  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toast: ToastService,
    private personOperationService: PersonOperationService,
    private userService:UserService,
    private flowService:StatusFlowService
  ) {

  }

  onClose() {
    this.closeClicked.emit();
  }
  setInvalidInputBorder() {
    if (this.nextStatus?.status === 'INVALID') {
      this.nextStatus.setErrors({ invalid: true });
    }
  }
  ngOnInit(): void {
    this.createForm();
    this.buildStatusOptions();
  }



  buildStatusOptions(){
    this.spinner.show();
    //console.log("this.operation",this.operation)
    if(this.operation.status&&this.operation.status.id&&this.operation.service&&this.operation.service.id){
      this.flowService.getStatusFlowByCurrentStatusAndServiceId(this.operation.status.id,this.operation.service.id).subscribe(data=>{
          if(data.success){
            //console.log(data.data)
            this.statusOption = data.data[0].nextStatuses ;
            this.spinner.hide();
          }else{
            this.toast.showError(data.message);
          }
          this.spinner.hide();
      })
    }
    this.spinner.hide();
  }



  createForm() {
    this.nextStatusControl = this.formBuilder.control(
      '',
      Validators.required
    );
    this.noteControl = this.formBuilder.control('');
    this.myForm = this.formBuilder.group({
      nextStatus:this.nextStatusControl,
      note:this.noteControl
    });
  }

  // fetchPosition(){
  //   this.spinner.show();
  //   this.userService.getOneByUUID(localStorage.getItem("uuid")+"").subscribe(data=>{
  //     if(data.success){
  //       if(data.data.position)
  //         this.buildStatusOptions(data.data.position);

  //       //console.log(data.data.position)

  //       this.userPosition = (data.data.position)?data.data.position:{};
  //       //console.log(this.userPosition)
  //       // this.spinner.hide();
  //     }
  //     this.spinner.hide();
  //   })

  // }

  onStatusChange() {

  }
//Artificial Intelligence
  onSubmit() {
    this.spinner.show();
    this.customInputs.forEach((customInput) => customInput.onBlur());
    if (this.myForm.invalid) {
      this.spinner.hide();
      this.setInvalidInputBorder();
    } else {
      this.personOperationService
        .changeStatus(Number(this.operation.id), this.myForm.value.nextStatus)
        .subscribe(
          (result) => {
            if (result.success) {
              this.spinner.hide();
              this.toast.showSuccess(result.message);
              this.onClose();
            } else {
              this.spinner.hide();
              this.toast.showError(result.message);
            }
          },
          (error) => {
            this.spinner.hide();
            this.toast.showError(error.error.message);
          }
        );
    }
  }
  get nextStatus() {
    return this.myForm.get('nextStatus');
  }
  get note() {
    return this.myForm.get('note');
  }
}
