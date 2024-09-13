import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  template: `
  <div class="form-group">
  <label [for]="id" [class.is-required]="required=='true'">{{ label }}</label>
  <input
    class="form-control"
    [type]="type"
    [required]= "required"
    [disabled]= "dis=='true'"
    [id]="id"
    [class.is-invalid]="invalid"
    [class.is-valid]="valid"
    [value]="value"
    (input)="onInputChange($event)"
    (blur)="onBlur()"
  />
  <div class="invalid-feedback" *ngIf="invalid">
    {{ control.errors?.['required'] ? 'حقل إجباري' : errorMessage }}
  </div>
</div>
  `,
  styles: [
    `
      .is-invalid {
        border: 1px solid red;
        
      }
      .is-required::after{
         content: "*";
         color: red;
        margin-left: 5px;
}
      .is-valid {
        border: 1px solid green;

      }
      .invalid-feedback {
        color: red;
      }
        input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background-color: #f2f2f2;
      }

    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomInputComponent,
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() id!: string;
  @Input() control!: FormControl;
  @Input() required !:string
  @Input() dis!:string;
  @Input() errorMessage: string = (this.required==="true")? "حقل إجباري":"خطأ";
  value: any;
  invalid: boolean = false;
  valid:boolean = false;

  onChange!: (value: any) => void;
  onTouched!: () => void;

  onInputChange(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
  }

  onBlur() {
    this.errorMessage = (this.required==="true")? "حقل إجباري":"خطأ";
    this.invalid = this.control.invalid;
    this.valid = !this.control.invalid;
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit() {
    this.id = this.id || this.label.toLowerCase().replace(' ', '-');
  }
}
