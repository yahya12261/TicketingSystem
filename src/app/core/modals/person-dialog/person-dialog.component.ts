import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPerson } from '../../Interfaces/Person';
import { CustomInputComponent } from '../../layout/custom-input/custom-input.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonService } from '../../services/personService/person.service';
import { ToastService } from '../../services/ToastService/toast.service';
import { DateUtils } from '../../helpers/DateUtils';
import { OptionList } from '../../helpers/OptionList';
import { searchList } from '../../Interfaces/SearchList';
import { getNationalitiesArray, Nationality } from '../../helpers/Nationality';
import { GovernmentService } from '../../services/Locations/governmentService/government.service';
import { CazaService } from '../../services/Locations/cazaService/caza.service';
import { TownService } from '../../services/Locations/townService/town.service';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.css']
})
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
  haveInsuranceControl!:FormControl;
  insuranceNameControl!:FormControl;
  noteControl!: FormControl;
  fromMedicalControl!:FormControl;


  insuranceNameOptions:[] = [];
  townAddressOptions:[] = []
  cazaAddressOptions:[] = []
  governmentAddressOptions:[] = []
  nationalityOptions=getNationalitiesArray();
  genderOptions=OptionList.getListByName("gender")
  dayOptions=[{}]
  monthsOptions =[{}]
  yearsOptions= DateUtils.getYears();
  person :IPerson = {} as IPerson;
  @Input() isUpdate !:"true"|"false";
  @Input() inpPerson !:IPerson;
  @Output() closeClicked = new EventEmitter<void>();
  @ViewChildren(CustomInputComponent) customInputs!: QueryList<CustomInputComponent>;
  constructor(private spinner : NgxSpinnerService,private formBuilder: FormBuilder,private serviceService:PersonService,private toast:ToastService,private governmentService:GovernmentService,private cazaService:CazaService,private townService:TownService){

  }
  ngOnInit(): void {
    this.fetchAllGovernments();
    console.log(this.yearsOptions);
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
      if (this.firstAr?.status==='INVALID') {
        this.firstAr.setErrors({ 'invalid': true });
      }
      if (this.middleAr?.status==='INVALID') {
        this.middleAr.setErrors({ 'invalid': true });
      }
      if (this.lastAr?.status==='INVALID') {
        this.lastAr.setErrors({ 'invalid': true });
      }
      if (this.year?.status==='INVALID') {
        this.year.setErrors({ 'invalid': true });
      }
      if (this.months?.status==='INVALID') {
        this.months.setErrors({ 'invalid': true });
      }
      if (this.day?.status==='INVALID') {
        this.day.setErrors({ 'invalid': true });
      }
      if (this.gender?.status==='INVALID') {
        this.gender.setErrors({ 'invalid': true });
      }
      if (this.nationality?.status==='INVALID') {
        this.nationality.setErrors({ 'invalid': true });
      }
      if (this.government?.status==='INVALID') {
        this.government.setErrors({ 'invalid': true });
      }
      if (this.cazaAddress?.status==='INVALID') {
        this.cazaAddress.setErrors({ 'invalid': true });
      }
      if (this.nationality?.status==='INVALID') {
        this.nationality.setErrors({ 'invalid': true });
      }
      if (this.phoneNumber?.status==='INVALID') {
        this.phoneNumber.setErrors({ 'invalid': true });
      }
  }
  createForm(data?:IPerson) {
    console.log("input",data?.dob instanceof Date)
    this.firstArController = this.formBuilder.control((data)?data.firstAr:'', Validators.required);
  this.middleArController = this.formBuilder.control((data)?data.middleAr:'', Validators.required);
  this.lastArController = this.formBuilder.control((data)?data.lastAr:'', Validators.required);
  this.firstEnController = this.formBuilder.control((data)?data.firstEn:'');
  this.middleEnController = this.formBuilder.control((data)?data.middleEn:'');
  this.lastEnController = this.formBuilder.control((data)?data.lastEn:'');
  this.yearControl = this.formBuilder.control((data&&data.dob)?new Date(data.dob).getFullYear():undefined, Validators.required);
  this.monthsControl = this.formBuilder.control((data&&data.dob)?new Date(data.dob).getMonth():'', Validators.required);
  this.dayControl = this.formBuilder.control((data&&data.dob)?new Date(data.dob).getDay():'', Validators.required);
  this.genderControl = this.formBuilder.control((data)?data.Gender:'', Validators.required);
  this.LIDController = this.formBuilder.control((data)?data.LID:'');
  this.nationalityControl = this.formBuilder.control((data)?data.nationality:Nationality.Lebanese, Validators.required);
  this.governmentAddressControl = this.formBuilder.control((data)?data.governmentAddress:'', Validators.required);
  this.cazaAddressControl = this.formBuilder.control((data)?data.cazaAddress:'', Validators.required);
  this.townAddressControl = this.formBuilder.control((data)?data.townAddress:'', Validators.required);
  this.phoneNumberController = this.formBuilder.control((data)?data.phoneNumber:'',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
  this.insuranceNameControl = this.formBuilder.control((data)?data.insuranceName:'');
  this.noteControl = this.formBuilder.control((data)?data.note:'');
  this.haveInsuranceControl = this.formBuilder.control((data)?data.haveInsurance:false)
 this.fromMedicalControl=this.formBuilder.control((data)?data.fromMedical:false)
  this.myForm = this.formBuilder.group({
    firstAr : this.firstArController,
    middleAr : this.middleArController,
    lastAr : this.lastArController,
    firstEn : this.firstEnController,
    middleEn : this.middleEnController,
    lastEn : this.lastEnController,
    year : this.yearControl,
    months : this.monthsControl,
    day : this.dayControl,
    gender : this.genderControl,
    LID : this.LIDController,
    nationality : this.nationalityControl,
    government : this.governmentAddressControl,
    cazaAddress : this.cazaAddressControl,
    townAddress : this.townAddressControl,
    phoneNumber : this.phoneNumberController,
    haveInsurance:this.haveInsuranceControl,
    insuranceName : this.insuranceNameControl,
    fromMedical:this.fromMedicalControl,
    note : this.noteControl
    });
  }
  onUpdate(){
    this.spinner.show();
    this.person.id = this.inpPerson.id
    this.person.firstAr = this.myForm.value.firstAr;
    this.person.middleAr = this.myForm.value.middleAr;
    this.person.lastAr = this.myForm.value.lastAr;
    this.person.firstEn = this.myForm.value.firstEn;
    this.person.middleEn = this.myForm.value.middleEn;
    this.person.lastEn = this.myForm.value.lastEn;
    this.person.dob = new Date(this.myForm.value.year,this.myForm.value.months,this.myForm.value.day);
    this.person.Gender = this.myForm.value.gender;
    this.person.LID = this.myForm.value.LID;
    this.person.nationality = this.myForm.value.nationality;
    this.person.governmentAddress = {id:this.myForm.value.government};
    this.person.cazaAddress= {id:this.myForm.value.cazaAddress};
    this.person.townAddress = this.myForm.value.townAddress;
    this.person.phoneNumber = this.myForm.value.phoneNumber;
    this.person.insuranceName = this.myForm.value.insuranceName;
    this.person.haveInsurance = this.myForm.value.haveInsurance;
    this.person.note = this.myForm.value.note;
    this.person.fromMedical = this.myForm.value.fromMedical
    this.serviceService.update(this.person).subscribe(result=>{
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
    this.spinner.hide();
    this.setInvalidInputBorder();

  } else {
    const data :IPerson = {
      firstAr : this.myForm.value.firstAr,
      middleAr : this.myForm.value.middleAr,
      lastAr : this.myForm.value.lastAr,
      firstEn : this.myForm.value.firstEn,
      middleEn : this.myForm.value.middleEn,
      lastEn : this.myForm.value.lastEn,
      dob : new Date(this.myForm.value.year,this.myForm.value.months,this.myForm.value.day),
      Gender : this.myForm.value.gender,
      LID : this.myForm.value.LID,
      nationality : this.myForm.value.nationality,
      governmentAddress :{id: this.myForm.value.government},
      cazaAddress: {id: this.myForm.value.cazaAddress},
      townAddress : this.myForm.value.townAddress,
      phoneNumber : this.myForm.value.phoneNumber,
      insuranceName : this.myForm.value.insuranceName,
      note : this.myForm.value.note,
      haveInsurance:this.myForm.value.haveInsurance,
      fromMedical:this.myForm.value.fromMedical
    }
    this.serviceService.create(data).subscribe(result=>{
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
  getAllYears(){
  //this.yearsOptions = DateUtils.getYears();
}
  get firstAr(){
    return this.myForm.get('firstAr');
  }
  get middleAr(){
    return this.myForm.get('middleAr');
  }
  get lastAr(){
    return this.myForm.get('lastAr');
  }
  get firstEn(){
    return this.myForm.get('firstEn');
  }
  get middleEn(){
    return this.myForm.get('middleEn');
  }
  get year(){
    return this.myForm.get('year');
  }
  get months(){
    return this.myForm.get('months');
  }
  get day(){
    return this.myForm.get('day');
  }
  get gender(){
    return this.myForm.get('gender');
  }
  get LID(){
    return this.myForm.get('LID');
  }
  get nationality(){
    return this.myForm.get('nationality');
  }
  get government(){
    return this.myForm.get('government');
  }
  get cazaAddress(){
    return this.myForm.get('cazaAddress');
  }
  get townAddress(){
    return this.myForm.get('townAddress');
  }
  get phoneNumber(){
    return this.myForm.get('phoneNumber');
  }
  get insuranceName(){
    return this.myForm.get('insuranceName');
  }
  get haveInsurance(){
    return this.myForm.get('haveInsurance');
  }
  get fromMedical(){
    return this.myForm.get('fromMedical');
  }
  get note() {
    return this.myForm.get('note');
  }
  onYearChange() {
    this.monthsOptions = DateUtils.getMonths();
    console.log(this.yearControl.value); // This will log the selected value
  }
  onMonthChange(){
    this.dayOptions = DateUtils.getDaysByYearAndMonth(Number(this.yearControl.value),Number(this.monthsControl.value));
  }

  fetchAllGovernments(){
    this.spinner.show();
    this.governmentService.getSelectOption().subscribe(data=>{
      if(data.success){
        this.governmentAddressOptions = data.data;
      }
    })
    this.spinner.hide();
    }
    onGovChange(){
      this.fetchCazaByGov(Number(this.governmentAddressControl.value));
      this.cazaAddressControl.reset();
      this.townAddressControl.reset();
    }
    onCazaChange(){
      this.fetchTownByCaza(Number(this.cazaAddressControl.value));
      this.townAddressControl.reset();
    }
    fetchCazaByGov(govId:number){
      this.spinner.show();
      this.cazaService.getSelectOptionByGovId(govId).subscribe(data=>{
        if(data.success){
          this.cazaAddressOptions = data.data;
          this.spinner.hide();
        }
      })
      this.spinner.hide();
      }
      fetchTownByCaza(cazaId:number){
        this.spinner.show();
        this.townService.getSelectOptionByCazaId(cazaId).subscribe(data=>{
          if(data.success){
            this.townAddressOptions = data.data;
            this.spinner.hide();
          }
        })
        this.spinner.hide();
        }
}
