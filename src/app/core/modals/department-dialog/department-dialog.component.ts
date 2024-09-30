import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GridComponent } from '../../layout/grid/grid.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { IDepartment } from '../../Interfaces/Department';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';
import { DepartmentService } from '../../services/departmentService/department.service';
import { ToastService } from '../../services/ToastService/toast.service';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css']
})
export class DepartmentDialogComponent implements
OnInit{
  myForm!: FormGroup;
  nameControl!: FormControl;
  arabicNameControl!: FormControl;
  noteControl!: FormControl;
  depatment:IDepartment = {} as IDepartment;
  @Input() isUpdate !:"true"|"false";
  @Input() department !:IDepartment;
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private departmentService:DepartmentService,private toast:ToastService){

  }
  ngOnInit(): void {
    this.createForm(this.department);
    //console.log(this.isUpdate)
    if(this.isUpdate){
      //console.log(this.department);

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
  createForm(dep?:IDepartment) {
    this.nameControl = this.formBuilder.control((dep)?dep.name:'', Validators.required);
    this.arabicNameControl = this.formBuilder.control((dep)?dep.arabicLabel:'', Validators.required);
    this.noteControl = this.formBuilder.control((dep)?dep.note:'');
    this.myForm = this.formBuilder.group({
      name: this.nameControl,
      arabicName: this.arabicNameControl,
      note: this.noteControl
    });
  }
  onUpdate(){
    this.spinner.show();
    this.department.note = this.myForm.value.note;
    this.departmentService.update(this.department).subscribe(result=>{
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
    const dep :IDepartment = {
      name:this.myForm.value.name,
      arabicLabel: this.myForm.value.arabicName,
      note:this.myForm.value.note
    }
    this.departmentService.create(dep).subscribe(result=>{
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
