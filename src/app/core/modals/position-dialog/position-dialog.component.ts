import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GridComponent } from '../../layout/grid/grid.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { IDepartment } from '../../Interfaces/Department';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';
import { DepartmentService } from '../../services/departmentService/department.service';
import { ToastService } from '../../services/ToastService/toast.service';
import { IPosition } from '../../Interfaces/Position';
import { PositionService } from '../../services/positionService/position.service';
@Component({
  selector: 'app-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['./position-dialog.component.css']
})
export class PositionDialogComponent implements
OnInit{
  myForm!: FormGroup;
  nameControl!: FormControl;
  arabicNameControl!: FormControl;
  departmentControl!: FormControl;
  noteControl!: FormControl;

  departments:IDepartment[] = [{}] as IDepartment[];
  @Input() isUpdate !:"true"|"false";
  @Input() position !:IPosition;
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private positionService : PositionService,private departmentService:DepartmentService,private toast:ToastService){

    this.fetchAllDepartments();

  }
  ngOnInit(): void {
    this.createForm(this.position);
    console.log(this.isUpdate)
    if(this.isUpdate){
      console.log(this.department);

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
  createForm(pos?:IPosition) {
    this.nameControl = this.formBuilder.control((pos)?pos.name:'', Validators.required);
    this.arabicNameControl = this.formBuilder.control((pos)?pos.arabicLabel:'', Validators.required);
    this.departmentControl = this.formBuilder.control((pos)?pos.department?.id:'',Validators.required);
    this.noteControl = this.formBuilder.control((pos)?pos.note:'');

    this.myForm = this.formBuilder.group({
      name: this.nameControl,
      arabicName: this.arabicNameControl,
      department: this.departmentControl,
      note: this.noteControl
    });
  }
  onUpdate(){
    this.spinner.show();
    this.position.note = this.myForm.value.note;
    this.position.arabicLabel = this.myForm.value.arabicName;
    this.position.department={id:this.myForm.value.department}
    this.positionService.update(this.position).subscribe(result=>{
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
    const pos :IPosition = {
      name:this.myForm.value.name,
      arabicLabel: this.myForm.value.arabicName,
      note:this.myForm.value.note,
      department:{id:this.myForm.value.department}
    }
    this.positionService.create(pos).subscribe(result=>{
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

  fetchAllDepartments(){
  this.departmentService.getSelectOption().subscribe(data=>{
    if(data.success){
      this.departments =  data.data;
    }
  })
  }
  get name() {
    return this.myForm.get('name');
  }
  get department() {
    return this.myForm.get('department');
  }
  get arabicName() {
    return this.myForm.get('arabicName');
  }
  get note() {
    return this.myForm.get('note');
  }
}
