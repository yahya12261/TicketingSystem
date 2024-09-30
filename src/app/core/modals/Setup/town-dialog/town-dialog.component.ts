import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICaza } from 'src/app/core/Interfaces/Locations/Caza';
import { IGovernment } from 'src/app/core/Interfaces/Locations/Government';
import { ITown } from 'src/app/core/Interfaces/Locations/Town';
import { CustomInputComponent } from 'src/app/core/layout/custom-input/custom-input.component';
import { CazaService } from 'src/app/core/services/Locations/cazaService/caza.service';
import { GovernmentService } from 'src/app/core/services/Locations/governmentService/government.service';
import { TownService } from 'src/app/core/services/Locations/townService/town.service';
import { ToastService } from 'src/app/core/services/ToastService/toast.service';

@Component({
  selector: 'app-town-dialog',
  templateUrl: './town-dialog.component.html',
  styleUrls: ['./town-dialog.component.css']
})
export class TownDialogComponent implements
OnInit{
  myForm!: FormGroup;
  nameControl!: FormControl;
  arabicNameControl!: FormControl;
  noteControl!: FormControl;
  governmentControl!: FormControl;
  town :ITown = {} as ITown;
  cazaControl !:FormControl;
  @Input() isUpdate !:"true"|"false";
  @Input() inpTown !:ITown;
  @Output() closeClicked = new EventEmitter<void>();
  cazas:ICaza[] = [{}] as ICaza[];
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private townService:TownService,private cazaService:CazaService,private toast:ToastService,private governmentService:GovernmentService){

  }
  ngOnInit(): void {
    this.fetchAllCazas();
    this.createForm(this.inpTown);
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
  createForm(obj?:ITown) {
    this.nameControl = this.formBuilder.control((obj)?obj.name:'', Validators.required);
    this.arabicNameControl = this.formBuilder.control((obj)?obj.arabicLabel:'', Validators.required);
    this.noteControl = this.formBuilder.control((obj)?obj.note:'');
    this.cazaControl = this.formBuilder.control((obj)?obj.caza:'');
    // this.cazaControl = this.formBuilder.control((obj)?obj.government:'');
    this.myForm = this.formBuilder.group({
      name: this.nameControl,
      arabicName: this.arabicNameControl,
      note: this.noteControl,
      caza:this.cazaControl
    });
  }
  onUpdate(){
    this.spinner.show();
    this.town.note = this.myForm.value.note;
    this.townService.update(this.town).subscribe(result=>{
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
    const town :ITown = {
      name:this.myForm.value.name,
      arabicLabel: this.myForm.value.arabicName,
      note:this.myForm.value.note,
      caza:this.myForm.value.caza
    }
    this.townService.create(town).subscribe(result=>{
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
fetchAllCazas(){
  this.cazaService.getSelectOption().subscribe(data=>{
    if(data.success){
      this.cazas =  data.data;
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
  get caza(){
    return this.myForm.get('caza');
  }
}
