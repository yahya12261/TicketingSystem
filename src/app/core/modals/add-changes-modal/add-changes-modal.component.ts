import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPersonOperation } from '../../Interfaces/PersonOperation';
import { IOperationChanges } from '../../Interfaces/operationChanges';
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangesService } from '../../services/changesService/changes.service';
import { ToastService } from '../../services/ToastService/toast.service';

@Component({
  selector: 'app-add-changes-modal',
  templateUrl: './add-changes-modal.component.html',
  styleUrls: ['./add-changes-modal.component.css']
})
export class AddChangesModalComponent implements
OnInit{
  myForm!: FormGroup;
  nameControl!: FormControl;
  arabicNameControl!: FormControl;
  noteControl!: FormControl;
  item:IOperationChanges = {} as IOperationChanges;
  @Input() isUpdate !:"true"|"false";
  @Input() personOperation !:IPersonOperation;
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private service:ChangesService,private toast:ToastService){

  }
  ngOnInit(): void {
    this.createForm();
    //console.log(this.isUpdate)
    if(this.isUpdate){
      //console.log();

    }
    this.spinner.hide();
  }
  onClose(){
    this.closeClicked.emit();
  }
  setInvalidInputBorder() {
      if (this.note?.status==='INVALID') {
        this.note.setErrors({ 'invalid': true });
      }
  }
  createForm() {
    this.noteControl = this.formBuilder.control('',Validators.required);
    this.myForm = this.formBuilder.group({
      note: this.noteControl
    });
  }
  // onUpdate(){
  //   this.spinner.show();
  //   this.department.note = this.myForm.value.note;
  //   this.departmentService.update(this.department).subscribe(result=>{
  //     if(result.success){
  //       this.spinner.hide();
  //       this.toast.showSuccess(result.message);
  //       this.onClose();
  //     }else{
  //       this.spinner.hide();
  //       this.toast.showError(result.message);
  //     }
  //   },error=>{
  //     this.spinner.hide();
  //     this.toast.showError(error.error.message);
  //   })
  // }
  onSubmit() {
    this.spinner.show();
  this.customInputs.forEach((customInput) => customInput.onBlur());
  if (this.myForm.invalid) {
    this.setInvalidInputBorder();
  } else {
    const data :IOperationChanges = {
      note:this.myForm.value.note,
      personOperation:{id:this.personOperation.id}
    }
    this.service.create(data).subscribe(result=>{
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
  get note() {
    return this.myForm.get('note');
  }
}
