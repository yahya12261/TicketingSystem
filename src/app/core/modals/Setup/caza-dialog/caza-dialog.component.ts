import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICaza } from 'src/app/core/Interfaces/Locations/Caza';
import { IGovernment } from 'src/app/core/Interfaces/Locations/Government';
import { CustomInputComponent } from 'src/app/core/layout/custom-input/custom-input.component';
import { CazaService } from 'src/app/core/services/Locations/cazaService/caza.service';
import { GovernmentService } from 'src/app/core/services/Locations/governmentService/government.service';
import { ToastService } from 'src/app/core/services/ToastService/toast.service';

@Component({
  selector: 'app-caza-dialog',
  templateUrl: './caza-dialog.component.html',
  styleUrls: ['./caza-dialog.component.css']
})
export class CazaDialogComponent implements
OnInit{
  myForm!: FormGroup;
  nameControl!: FormControl;
  arabicNameControl!: FormControl;
  noteControl!: FormControl;
  governmentControl!: FormControl;
  caza :ICaza = {} as ICaza;
  @Input() isUpdate !:"true"|"false";
  @Input() inpCaza !:ICaza;
  @Output() closeClicked = new EventEmitter<void>();
  governments:IGovernment[] = [{}] as IGovernment[];
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private cazaService:CazaService,private toast:ToastService,private governmentService:GovernmentService){
this.fetchAllGovernments()
  }
  ngOnInit(): void {
    this.createForm(this.inpCaza);
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
  createForm(obj?:ICaza) {
    this.nameControl = this.formBuilder.control((obj)?obj.name:'', Validators.required);
    this.arabicNameControl = this.formBuilder.control((obj)?obj.arabicLabel:'', Validators.required);
    this.noteControl = this.formBuilder.control((obj)?obj.note:'');
    this.governmentControl = this.formBuilder.control((obj)?obj.government:'');
    this.myForm = this.formBuilder.group({
      name: this.nameControl,
      arabicName: this.arabicNameControl,
      note: this.noteControl,
      government:this.governmentControl
    });
  }
  onUpdate(){
    this.spinner.show();
    this.caza.note = this.myForm.value.note;
    this.cazaService.update(this.caza).subscribe(result=>{
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
    const caza :ICaza = {
      name:this.myForm.value.name,
      arabicLabel: this.myForm.value.arabicName,
      note:this.myForm.value.note,
     government:{id:this.myForm.value.government}
    }
    this.cazaService.create(caza).subscribe(result=>{
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
fetchAllGovernments(){
  this.governmentService.getSelectOption().subscribe(data=>{
    if(data.success){
      this.governments =  data.data;
    }
  })
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
  get government(){
    return this.myForm.get('government');
  }
}
