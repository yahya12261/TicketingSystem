import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../Interfaces/User';
import { OptionList } from '../../helpers/OptionList';
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';
import { CustomSelectComponent } from '../../layout/custom-select/custom-select.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/UserService/user.service';
import { ToastService } from '../../services/ToastService/toast.service';
import { PositionService } from '../../services/positionService/position.service';
import { IPosition } from '../../Interfaces/Position';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements
OnInit{
  myForm!: FormGroup;
  firstControl!: FormControl;
  middleControl!: FormControl;
  lastControl!: FormControl;
  arabicLabelControl!: FormControl;
  emailControl!: FormControl;
  usernameControl!: FormControl;
  phoneNumberControl!: FormControl;
  positionControl!: FormControl;
  user:IUser = {} as IUser;
  positionOption:IPosition[] = [{}] as IPosition[]
  @Input() isUpdate !:"true"|"false";
  @Input() InpUser !:IUser;
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  @ViewChildren(CustomSelectComponent) customSelects!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private service:UserService,private toast:ToastService,private positionService:PositionService){

  }
  ngOnInit(): void {
    this.createForm(this.InpUser);
    this.fetchPositions();
    this.spinner.hide();
  }
  onClose(){
    this.closeClicked.emit();
  }
  setInvalidInputBorder() {
    this.setInputErrors(this.first);
    this.setInputErrors(this.middle);
    this.setInputErrors(this.last);
    this.setInputErrors(this.arabicLabel);
    this.setInputErrors(this.email);
    this.setInputErrors(this.username);
    this.setInputErrors(this.phoneNumber);
    this.setInputErrors(this.position);
  }
  setInputErrors(inp:any){
    if (inp?.status==='INVALID') {
      inp.setErrors({ 'invalid': true });
    }
  }
  createForm(user?:IUser) {
    this.firstControl = this.formBuilder.control((user)?user.first:"",Validators.required);
    this.middleControl = this.formBuilder.control((user)?user.middle:"",Validators.required);
    this.lastControl = this.formBuilder.control((user)?user.last:"",Validators.required);
    this.arabicLabelControl = this.formBuilder.control((user)?user.arabicLabel:"",Validators.required)
    this.emailControl = this.formBuilder.control((user)?user.email:"",[Validators.required,Validators.email]);
    this.usernameControl = this.formBuilder.control((user)?user.username:"");
    this.phoneNumberControl = this.formBuilder.control((user)?user.phoneNumber:"",Validators.required);
    this.positionControl = this.formBuilder.control((user)?user.position?.id:"",Validators.required);
    this.myForm = this.formBuilder.group({
      first:this.firstControl,
      middle:this.middleControl,
      last:this.lastControl,
      arabicLabel:this.arabicLabelControl,
      email:this.emailControl,
      username:this.usernameControl,
      phoneNumber:this.phoneNumberControl,
      position:this.positionControl,
    });
  }
  onUpdate(){
    this.spinner.show();
    this.InpUser.phoneNumber = this.myForm.value.phoneNumber;
    this.InpUser.email = this.myForm.value.email;
    this.InpUser.arabicLabel = this.myForm.value.arabicLabel;
    this.InpUser.middle = this.myForm.value.middle;
    this.service.update(this.InpUser).subscribe(result=>{
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
    const user:IUser = {
      first:this.myForm.value.first,
      middle:this.myForm.value.middle,
      last:this.myForm.value.last,
      arabicLabel:this.myForm.value.arabicLabel,
      email:this.myForm.value.email,
      username:this.myForm.value.username,
      phoneNumber:this.myForm.value.phoneNumber,
      position:{id:this.myForm.value.position},
    }
    this.service.create(user).subscribe(result=>{
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

fetchPositions(){
  this.positionService.getSelectOption().subscribe(data=>{
    if(data.success){
      this.positionOption =  data.data;
    }
  })
}
  get first() {
    return this.myForm.get('first');
  }
  get middle() {
    return this.myForm.get('middle');
  }
  get last() {
    return this.myForm.get('last');
  }
  get arabicLabel() {
    return this.myForm.get('arabicLabel');
  }
  get email() {
    return this.myForm.get('email');
  }
  get username() {
    return this.myForm.get('username');
  }
  get phoneNumber() {
    return this.myForm.get('phoneNumber');
  }
  get position() {
    return this.myForm.get('position');
  }
}
