import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../Auth-Services/api.service';
import { ToastService } from '../../Auth-Services/ToastService/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token !:string|null;
  form!: FormGroup;
  errorMsg: String = '';
  title = "تغير كلمة السر";
  constructor(private route: ActivatedRoute,private router: Router,
    private apiService: ApiService,
    private toast : ToastService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder){
      this.form = this.formBuilder.group({
        pass1: ['', [Validators.required,]],
        pass2: ['', [Validators.required,]]
      });
}
  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    if(params){
      //console.log(params.get('token'));
      this.token = params.get('token');
    }
  });
  }
  onSubmit(){
    this.spinner.show();
    if(this.validate()){
      this.apiService.changePassword(this.pass1,this.pass2).subscribe({
        next:(data)=>{
          if(data.success){
            this.toast.showSuccess(data.message);
            this.apiService.setLoggedIn(true);
            this.spinner.hide();
            this.router.navigateByUrl("core/");

          }else{
            this.toast.showError(data.message);
            this.errorMsg = data.message;
            this.spinner.hide();
          }

        },
        error:(err)=>{
          this.spinner.hide();
          this.toast.showError( err.error.message);
          this.errorMsg = err.error.message;
        }
      })
    }
    this.spinner.hide();
  }

  get pass1(){
    return this.form?.get('pass1')?.value;
  }
  get pass2(){
    return this.form?.get('pass2')?.value;
  }
  validate(): boolean {
    if (!this.pass1 || !this.pass2) {
        this.errorMsg = 'يرجى ملئ الحقول المطلوبة';
        return false;
    }

    // Simplified password regex
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(this.pass1)) {
        this.errorMsg = 'كلمة المرور ينبغي أن تكون طول الأقل 8 أحرف وتحتوي على حرف واحد وعدد';
        return false;
    }

    // Check if password 1 and password 2 match
    if (this.pass1 !== this.pass2) {
        this.errorMsg = 'كلمتا المرور غير متطابقتين';
        return false;
    }

    // Check for SQL injection
    if (this.containsSqlInjection(this.pass1) || this.containsSqlInjection(this.pass2)) {
        this.errorMsg = 'تم استعمال رموز لايمكن استعمالها في كلمة المرور';
        return false;
    }

    this.errorMsg = "";
    return true;
}

containsSqlInjection(input: string): boolean {
    const sqlInjectionRegex = /(?:--|#|\/\*|\*\/|;|,|'|"|=|>|<|@|`|&&|\|\|)/i;
    return sqlInjectionRegex.test(input);
}

}
