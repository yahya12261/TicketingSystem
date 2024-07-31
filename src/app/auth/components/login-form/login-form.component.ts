import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Auth-Services/interfaces/app.interface';
import { ApiService } from '../../Auth-Services/api.service';
import { ToastService } from '../../Auth-Services/ToastService/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  otpForm!: FormGroup;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toast : ToastService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {
    this.spinner.show();
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('core/home');
    }
    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]]
    });
  }
  title = "تسجيل الدخول";
  sAuth = false;
  fAuth = true;
  errorMsg: String = '';

  user: User = {
    username: '',
    password: '',
    OTP:'',
    uuid:''

  };
  ngOnInit(): void {
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([this.router.url]);
    // });
    this.spinner.hide();
  }
  onFAuthSubmit() {
    // this.router.navigateByUrl('Main/home');
    if(this.validateAuth()){
    this.spinner.show();
    // this.user.username = this.username;
    // this.user.password = this.password + '';
    this.apiService.login(this.user).subscribe({
      next: (data) => {

        console.log(data);

        if (data.success) {
          this.toast.showSuccess(data.message);
          this.title = "تأكيد الهوية";
          this.fAuth = false;
          this.sAuth = true;
          this.user.uuid = data.data.uuid;
          this.spinner.hide();
          this.errorMsg ="";
          // localStorage.setItem('token', data.token);
          // this.router.navigateByUrl('Main');
          // this.apiService.setLoggedIn(true);
          // window.location.reload();
        } else {
          this.toast.showError(data.message);
          this.errorMsg = data.message;
        }

      },
      error: (err) => {
        this.spinner.hide();
        this.toast.showError( err.error.message);
        this.errorMsg = err.error.message;
      },
    });
  }

  }
  onSAuthSubmit(){
    console.log(this.user)
    if(this.validateOTPAuth()){
      this.spinner.show();
      this.apiService.loginByOTP(this.user).subscribe({
        next:(data)=>{
          if(data.success){
          this.toast.showSuccess(data.message);
          localStorage.setItem('token', data.data);
          localStorage.setItem('uuid',this.user.uuid+"");
          this.router.navigateByUrl('Main');
          this.apiService.setLoggedIn(true);
          this.spinner.hide();
          this.clearUser();
          // window.location.reload();
          }else{
            this.toast.showError(data.message);
            this.errorMsg = data.message;
          }
        },
        error:(err)=>{
          this.spinner.hide();
          this.toast.showError( err.error.message);
          this.errorMsg = err.error.message;
        }
      });

    }

  }
  validateOTPAuth():boolean{
    if(this.user.OTP.trim() === ''){
      this.errorMsg = 'الرمز غير صحيح';
      return false;
    }
    if(this.user.uuid.trim() === ''){
      this.sAuth = false;
      this.fAuth = true;
      this.clearUser();
      this.toast.showError("خطأ ما يرجى إعادة تسجيل الدخول");
      return false;
    }
    return true;
  }
  validateAuth(): boolean {
    // Validate username
    if (this.user.username.trim() === '') {
      this.errorMsg = 'الرجاء إدخال اسم المستخدم.';
      return false;
    }

    // Validate password
    if (this.user.password.trim() === '') {
      this.errorMsg = 'الرجاء إدخال كلمة المرور.';
      return false;
    }
    if (this.user.password.length < 6) {
      this.errorMsg = 'يجب أن تكون كلمة المرور على الأقل 6 أحرف.';
      return false;
    }
    if (this.user.password.toLowerCase().includes('select') || this.user.password.toLowerCase().includes('from') || this.user.password.toLowerCase().includes('where')) {
      this.errorMsg = 'لا يمكن أن تحتوي كلمة المرور على كلمات SQL.';
      return false;
    }

    // Validation passed
    return true;
  }
  clearUser():void{
    this.user = {
      username: '',
      password: '',
      OTP:'',
      uuid:''
    };
  }

}
