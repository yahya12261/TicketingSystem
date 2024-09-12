import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPerson } from '../../Interfaces/Person';
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonService } from '../../services/personService/person.service';
import { ToastService } from '../../services/ToastService/toast.service';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.css']
})
// firstArController:
  // middleArController:
  // lastArController:
  // firstEnController:
  // middleEnController:
  // lastEnController:
  // yearControl:
  // monthsControl:
  // dayControl:
  // genderControl:
  // LIDController:
  // nationalityControl:
  // governmentAddressControl:
  // cazaAddressControl:
  // townAddressControl:
  // phoneNumberController:
  // insuranceNameControl:
export class PersonDialogComponent implements
OnInit{
  myForm!: FormGroup;
  firstArController!:FormControl;
  middleArController!:FormControl;
  lastArController!:FormControl;
  firstEnController!:FormControl;
  middleEnController!:FormControl;
  lastEnController!:FormControl;
  yearControl!:FormControl;
  monthsControl!:FormControl;
  dayControl!:FormControl;
  genderControl!:FormControl;
  LIDController!:FormControl;
  nationalityControl!:FormControl;
  governmentAddressControl!:FormControl;
  cazaAddressControl!:FormControl;
  townAddressControl!:FormControl;
  phoneNumberController!:FormControl;
  insuranceNameControl!:FormControl;
  noteControl!: FormControl;
  status :IPerson = {} as IPerson;
  @Input() isUpdate !:"true"|"false";
  @Input() inpPerson !:IPerson;
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private serviceService:PersonService,private toast:ToastService){

  }
  ngOnInit(): void {
    this.createForm(this.inpPerson);
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
  createForm(data?:IPerson) {
    this.firstArController = this.formBuilder.control((data)?data.firstAr:'', Validators.required);
  this.middleArController = this.formBuilder.control((data)?data.middleAr:'', Validators.required);
  this.lastArController = this.formBuilder.control((data)?data.lastAr:'', Validators.required);
  this.firstEnController = this.formBuilder.control((data)?data.firstEn:'', Validators.required);
  this.middleEnController = this.formBuilder.control((data)?data.middleEn:'', Validators.required);
  this.lastEnController = this.formBuilder.control((data)?data.lastEn:'', Validators.required);
  this.yearControl = this.formBuilder.control((data)?data.dob.getFullYear():'', Validators.required);
  this.monthsControl = this.formBuilder.control((data)?data.dob.getMonth():'', Validators.required);
  this.dayControl = this.formBuilder.control((data)?data.dob.getDay():'', Validators.required);
  this.genderControl = this.formBuilder.control((data)?data.Gender:'', Validators.required);
  this.LIDController = this.formBuilder.control((data)?data.LID:'', Validators.required);
  this.nationalityControl = this.formBuilder.control((data)?data.nationality:'', Validators.required);
  this.governmentAddressControl = this.formBuilder.control((data)?data.governmentAddress:'', Validators.required);
  this.cazaAddressControl = this.formBuilder.control((data)?data.cazaAddress:'', Validators.required);
  this.townAddressControl = this.formBuilder.control((data)?data.townAddress:'', Validators.required);
  this.phoneNumberController = this.formBuilder.control((data)?data.phoneNumber:'', Validators.required);
  this.insuranceNameControl = this.formBuilder.control((data)?data.insuranceName:'', Validators.required);
  this.noteControl = this.formBuilder.control((data)?data.note:'');
  this.myForm = this.formBuilder.group({
      // name: this.nameControl,
      // arabicName: this.arabicNameControl,
      // note: this.noteControl
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
    const gov :IPerson = {
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
