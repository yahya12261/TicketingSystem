import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { IService } from '../../Interfaces/Service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../../services/ServiceService/service.service';
import { ToastService } from '../../services/ToastService/toast.service';
@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['../baseStyle/style.css']
})
export class ServiceDialogComponent implements
OnInit{
  myForm!: FormGroup;
  nameControl!: FormControl;
  arabicNameControl!: FormControl;
  noteControl!: FormControl;
  status :IService = {} as IService;
  @Input() isUpdate !:"true"|"false";
  @Input() inpService !:IService;
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private serviceService:ServiceService,private toast:ToastService){

  }
  ngOnInit(): void {
    this.createForm(this.inpService);
    console.log(this.isUpdate)
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
  createForm(gov?:IService) {
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
    this.status.note = this.myForm.value.note;
    this.serviceService.update(this.status).subscribe(result=>{
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
    const gov :IService = {
      name:this.myForm.value.name,
      arabicLabel: this.myForm.value.arabicName,
      note:this.myForm.value.note
    }
    this.serviceService.create(gov).subscribe(result=>{
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
