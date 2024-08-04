import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GridComponent } from '../../layout/grid/grid.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';
import { DepartmentService } from '../../services/departmentService/department.service';
import { ToastService } from '../../services/ToastService/toast.service';
import { IRule } from '../../Interfaces/Rule';
import { RuleService } from '../../services/RuleService/rule.service';
import { OptionList } from '../../helpers/OptionList';

@Component({
  selector: 'app-rule-dialog',
  templateUrl: './rule-dialog.component.html',
  styleUrls: ['./rule-dialog.component.css']
})
export class RuleDialogComponent implements
OnInit{
  myForm!: FormGroup;
  nameControl!: FormControl;
  arabicNameControl!: FormControl;
  noteControl!: FormControl;
  typeControl!: FormControl;
  rule:IRule = {} as IRule;
  types = OptionList.getListByName("ruleType");
  @Input() isUpdate !:"true"|"false";
  @Input() InpRule !:IRule;
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private ruleService:RuleService,private toast:ToastService){

  }
  ngOnInit(): void {
    this.createForm(this.InpRule);
    console.log(this.isUpdate)
    if(this.isUpdate){
      console.log(this.InpRule);

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
  createForm(ru?:IRule) {
    this.nameControl = this.formBuilder.control((ru)?ru.name:'', Validators.required);
    this.arabicNameControl = this.formBuilder.control((ru)?ru.arabicLabel:'', Validators.required);
    this.typeControl = this.formBuilder.control((ru)?ru.type:'', Validators.required);

    this.noteControl = this.formBuilder.control((ru)?ru.note:'');
    this.myForm = this.formBuilder.group({
      name: this.nameControl,
      arabicName: this.arabicNameControl,
      note: this.noteControl,
      type:this.typeControl
    });
  }
  onUpdate(){
    this.spinner.show();
    this.InpRule.note = this.myForm.value.note;
    this.InpRule.arabicLabel = this.myForm.value.arabicName;
    this.ruleService.update(this.InpRule).subscribe(result=>{
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
    const ru :IRule = {
      name:this.myForm.value.name,
      arabicLabel: this.myForm.value.arabicName,
      note:this.myForm.value.note,
      type:this.myForm.value.type
    }
    this.ruleService.create(ru).subscribe(result=>{
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
  get type() {
    return this.myForm.get('type');
  }
}
