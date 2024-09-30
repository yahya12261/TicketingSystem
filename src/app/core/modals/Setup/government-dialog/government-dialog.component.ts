import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IGovernment } from 'src/app/core/Interfaces/Locations/Government';
import { CustomInputComponent } from 'src/app/core/layout/custom-input/custom-input.component';
import { DepartmentService } from 'src/app/core/services/departmentService/department.service';
import { GovernmentService } from 'src/app/core/services/Locations/governmentService/government.service';
import { ToastService } from 'src/app/core/services/ToastService/toast.service';

@Component({
  selector: 'app-government-dialog',
  templateUrl: './government-dialog.component.html',
  styleUrls: ['./government-dialog.component.css']
})
export class GovernmentDialogComponent implements
OnInit{
  myForm!: FormGroup;
  nameControl!: FormControl;
  arabicNameControl!: FormControl;
  noteControl!: FormControl;
  government :IGovernment = {} as IGovernment;
  @Input() isUpdate !:"true"|"false";
  @Input() inpGovernment !:IGovernment;
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private governmetService:GovernmentService,private toast:ToastService){

  }
  ngOnInit(): void {
    this.createForm(this.inpGovernment);
    //console.log(this.isUpdate)
    if(this.isUpdate){
    }
    this.spinner.hide();
  }
  onClose(){
    this.closeClicked.emit();
  }
  setInvalidInputBorder() {
      if (this.name?.status==='INVALID') {
        this.name.setErrors({ 'invalid': true });
      }
      if (this.arabicName?.status==='INVALID') {
        this.arabicName.setErrors({ 'invalid': true });
      }
  }
  createForm(gov?:IGovernment) {
    this.nameControl = this.formBuilder.control((gov)?gov.name:'', Validators.required);
    this.arabicNameControl = this.formBuilder.control((gov)?gov.arabicLabel:'', Validators.required);
    this.noteControl = this.formBuilder.control((gov)?gov.note:'');
    this.myForm = this.formBuilder.group({
      name: this.nameControl,
      arabicName: this.arabicNameControl,
      note: this.noteControl
    });
  }
  onUpdate(){
    this.spinner.show();
    this.government.note = this.myForm.value.note;
    this.governmetService.update(this.government).subscribe(result=>{
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
    this.setInvalidInputBorder();
  } else {
    const gov :IGovernment = {
      name:this.myForm.value.name,
      arabicLabel: this.myForm.value.arabicName,
      note:this.myForm.value.note
    }
    this.governmetService.create(gov).subscribe(result=>{
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
  get name() {
    return this.myForm.get('name');
  }
  get arabicName() {
    return this.myForm.get('arabicName');
  }
  get note() {
    return this.myForm.get('note');
  }
}
