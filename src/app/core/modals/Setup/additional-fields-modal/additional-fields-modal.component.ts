import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { OptionList } from 'src/app/core/helpers/OptionList';
import { IAdditionalServiceFields } from 'src/app/core/Interfaces/AdditionalServiceFields';
import { CustomInputComponent } from 'src/app/core/layout/custom-input/custom-input.component';
import { AdditionalServiceFieldListService } from 'src/app/core/services/AdditionalServiceFieldListService/additional-service-field-list.service';
import { AdditionalServiceFieldService } from 'src/app/core/services/AdditionalServiceFieldService/additional-service-field.service';
import { ServiceService } from 'src/app/core/services/ServiceService/service.service';
import { ToastService } from 'src/app/core/services/ToastService/toast.service';

@Component({
  selector: 'app-additional-fields-modal',
  templateUrl: './additional-fields-modal.component.html',
  styleUrls: ['./additional-fields-modal.component.css']
})
export class AdditionalFieldsModalComponent implements
OnInit{
  myForm!: FormGroup;
  serviceControl!: FormControl;
  arabicNameControl!:FormControl;
  typeControl!:FormControl;
  requiredControl!:FormControl;
  servicesOptions= [] = [];
  typesOptions = OptionList.getListByName("inputTypes");
  item :IAdditionalServiceFields = {} as IAdditionalServiceFields;
  @Input() isUpdate !:"true"|"false";
  @Input() inpItem !:IAdditionalServiceFields;
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private toast:ToastService,private service:AdditionalServiceFieldService,private serviceService:ServiceService){
  }
  ngOnInit(): void {
    this.fetchAllServices();
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
      if (this.type?.status==='INVALID') {
        this.type.setErrors({ 'invalid': true });
      }
      if (this.selectedService?.status==='INVALID') {
        this.selectedService.setErrors({ 'invalid': true });
      }
  }
  createForm(obj?:IAdditionalServiceFields) {
    this.arabicNameControl = this.formBuilder.control((obj)?obj.arabicLabel:'', Validators.required);
    this.serviceControl = this.formBuilder.control((obj)?obj.service?.id:'',Validators.required);
    this.typeControl = this.formBuilder.control((obj)?obj.fieldType:'',Validators.required);
    this.requiredControl = this.formBuilder.control((obj)?obj.isRequired:'');
    // this.cazaControl = this.formBuilder.control((obj)?obj.government:'');
    this.myForm = this.formBuilder.group({
      arabicName: this.arabicNameControl,
      service:this.serviceControl,
      type:this.typeControl,
      required:this.requiredControl
    });
  }
  onUpdate(){
    this.spinner.show();
    this.item.arabicLabel = this.myForm.value.arabicName;
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
    const town :IAdditionalServiceFields = {
      arabicLabel: this.myForm.value.arabicName,
      fieldType:this.myForm.value.type,
      service:{id:Number(this.serviceControl.value)},
    }

    if(this.myForm.value.isRequired){
    town.isRequired = this.myForm.value.isRequired;}

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
fetchAllServices(){
  this.serviceService.getSelectOption().subscribe(data=>{
    if(data.success){
      this.servicesOptions =  data.data;
    }
  })

}

  get arabicName() {
    return this.myForm.get('arabicName');
  }
  get selectedService() {
    return this.myForm.get('selectedService');
  }
  get type() {
    return this.myForm.get('type');
  }
  get isRequired() {
    return this.myForm.get('isRequired');
  }

}

