import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPosition } from '../../Interfaces/Position';
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PositionService } from '../../services/positionService/position.service';
import { ToastService } from '../../services/ToastService/toast.service';

@Component({
  selector: 'app-mng-assigners-modal',
  templateUrl: './mng-assigners-modal.component.html',
  styleUrls: ['./mng-assigners-modal.component.css']
})
export class MngAssignersModalComponent implements
OnInit{
  myForm!: FormGroup;
  assignerControl!: FormControl;
  assignedControl!: FormControl;
  // assigners :ITown = {} as ITown;
  @Output() closeClicked = new EventEmitter<void>();
  positions:IPosition[] = [{}] as IPosition[];
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private toast :ToastService,
    private service:PositionService){

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
      if (this.assigner?.status==='INVALID') {
        this.assigner.setErrors({ 'invalid': true });
      }
      if (this.assigned?.status==='INVALID') {
        this.assigned.setErrors({ 'invalid': true });
      }
  }
  createForm() {
    this.assignerControl = this.formBuilder.control(undefined, Validators.required);
    this.assignedControl = this.formBuilder.control(undefined, Validators.required);
    // this.cazaControl = this.formBuilder.control((obj)?obj.government:'');
    this.myForm = this.formBuilder.group({
      name: this.assignerControl,
      arabicName: this.assignedControl,
    });
  }
  // onUpdate(){
  //   this.spinner.show();
  //   this.town.note = this.myForm.value.note;
  //   this.townService.update(this.town).subscribe(result=>{
  //     if(result.success){
  //       this.spinner.hide();
  //       this.toast.showSuccess(result.message);
  //       this.onClose();
  //     }else{
  //       this.spinner.hide();
  //       this.toast.showError(result.message);
  //     }
  //   },error=>{
  //     this.spinner.hide();
  //     this.toast.showError(error.error.message);
  //   })
  // }
  onSubmit() {
    this.spinner.show();
  this.customInputs.forEach((customInput) => customInput.onBlur());
  if (this.myForm.invalid) {
    this.setInvalidInputBorder();
  } else {
    const data  = {
      assigner :this.assignerControl.value ,
      assigned :this.assignedControl.value
    }
    //console.log(data)
    this.service.addAssigners(data).subscribe(result=>{
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
  this.service.getSelectOption().subscribe(data=>{
    if(data.success){
      this.positions =  data.data;
    }
  })
  }
  get assigner() {
    return this.myForm.get('assigner');
  }
  get assigned() {
    return this.myForm.get('assigned');
  }
}
