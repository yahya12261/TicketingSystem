import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IAdditionalServiceList } from 'src/app/core/Interfaces/AdditionalServiceList';
import { CustomInputComponent } from 'src/app/core/layout/custom-input/custom-input.component';
import { AdditionalServiceFieldListService } from 'src/app/core/services/AdditionalServiceFieldListService/additional-service-field-list.service';
import { AdditionalServiceFieldService } from 'src/app/core/services/AdditionalServiceFieldService/additional-service-field.service';
import { ToastService } from 'src/app/core/services/ToastService/toast.service';

@Component({
  selector: 'app-additional-service-field-list-modal',
  templateUrl: './additional-service-field-list-modal.component.html',
  styleUrls: ['./additional-service-field-list-modal.component.css']
})
export class AdditionalServiceFieldListModalComponent implements
OnInit{
  myForm!: FormGroup;
  arabicNameControl!: FormControl;
  dscControl!: FormControl;
  fieldControl!:FormControl;
  item :IAdditionalServiceList = {} as IAdditionalServiceList;
  @Input() isUpdate !:"true"|"false";
  @Input() inpItem !:IAdditionalServiceList;
  fieldsOptions :[] = []
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private fieldService: AdditionalServiceFieldService,private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private toast:ToastService,private service:AdditionalServiceFieldListService){


  }
  ngOnInit(): void {

    this.fetchAllFields();
    this.createForm(this.inpItem);
    this.spinner.hide();
  }
  onClose(){
    this.closeClicked.emit();
  }
  setInvalidInputBorder() {
      if (this.arabicName?.status==='INVALID') {
        this.arabicName.setErrors({ 'invalid': true });
      }
      if (this.dsc?.status==='INVALID') {
        this.dsc.setErrors({ 'invalid': true });
      }
  }
  createForm(obj?:IAdditionalServiceList) {
    this.arabicNameControl = this.formBuilder.control((obj)?obj.arabicLabel:'', Validators.required);
    this.dscControl = this.formBuilder.control((obj)?obj.type:'');
    this.fieldControl = this.formBuilder.control((obj)?obj.field:undefined,Validators.required)
    // this.cazaControl = this.formBuilder.control((obj)?obj.government:'');
    this.myForm = this.formBuilder.group({
      arabicName: this.arabicNameControl,
      dsc:this.dscControl,
      field:this.fieldControl
    });
  }
  onUpdate(){
    this.spinner.show();
    this.item.arabicLabel = this.myForm.value.arabicLabel;
    this.service.update(this.item).subscribe(result=>{
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
    const town :IAdditionalServiceList = {
      arabicLabel: this.myForm.value.arabicName,
      dsc:this.myForm.value.dsc,
      field:{id:Number(this.fieldControl.value)}
    }
    this.service.create(town).subscribe(result=>{
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

fetchAllFields(){
  this.fieldService.getSelectOption().subscribe(data=>{
    if(data.success){
      this.fieldsOptions =  data.data;
    }
  })
}

  get arabicName() {
    return this.myForm.get('arabicName');
  }
  get dsc() {
    return this.myForm.get('dsc');
  }
  get field(){
    return this.myForm.get("field")
  }
}

