import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/auth/Auth-Services/ToastService/toast.service';
import { IStatus } from 'src/app/core/Interfaces/Status/Status';
import { CustomInputComponent } from 'src/app/core/layout/custom-input/custom-input.component';
import { StatusService } from 'src/app/core/services/statusService/status.service';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['../../baseStyle/style.css']
})
export class StatusDialogComponent implements
OnInit{
  myForm!: FormGroup;
  nameControl!: FormControl;
  arabicNameControl!: FormControl;
  colorControl!:FormControl;
  noteControl!: FormControl;
  selectedColor:string="#000000";
  status :IStatus = {} as IStatus;
  @Input() isUpdate !:"true"|"false";
  @Input() input !:IStatus;
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private statusService:StatusService,private toast:ToastService){

  }
  ngOnInit(): void {
    this.createForm(this.input);
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
  onChangeColorPiker(event:any){
    this.selectedColor = event.target.value;
    console.log('Selected color:', this.selectedColor);

  }
  createForm(data?:IStatus) {
    this.nameControl = this.formBuilder.control((data)?data.name:'', Validators.required);
    this.arabicNameControl = this.formBuilder.control((data)?data.arabicLabel:'', Validators.required);
    this.noteControl = this.formBuilder.control((data)?data.note:'');
    this.colorControl = this.formBuilder.control((data)?data.color:'');
    this.selectedColor = data?.color+"";
    this.myForm = this.formBuilder.group({
      name: this.nameControl,
      arabicName: this.arabicNameControl,
      note: this.noteControl,
      color:this.colorControl
    });
  }
  onUpdate(){
    this.spinner.show();
    this.status.id = this.input.id;
    this.status.note = this.myForm.value.note;
    this.status.color = this.selectedColor;
    this.statusService.update(this.status).subscribe(result=>{
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
    const gov :IStatus = {
      name:this.myForm.value.name,
      arabicLabel: this.myForm.value.arabicName,
      note:this.myForm.value.note,
      color:this.selectedColor
    }
    this.statusService.create(gov).subscribe(result=>{
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
  get color() {
    return this.myForm.get('color');
  }
}
