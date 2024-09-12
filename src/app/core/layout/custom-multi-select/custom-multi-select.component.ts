import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-multi-select',
  template: `
    <div class="form-group">
      <label [for]="id" [class.is-required]="required">{{ label }}</label>
      <select
        class="form-control"
        [required]="required"
        [disabled]="disabled"
        [id]="id"
        [class.is-invalid]="invalid"
        [class.is-valid]="valid"
        (change)="onSelectionChange($event)"
        (blur)="onBlur()"
        multiple
      >
        <option [value]="''" disabled>{{ placeholder }}</option>
        <option *ngFor="let option of options" [value]="option[value]">
          {{ option[labelValue] }}
        </option>
      </select>
      <div class="invalid-feedback" *ngIf="invalid">
        {{ control?.errors?.['required'] ? 'حقل إجباري' : errorMessage }}
      </div>
    </div>
  `,
  styles: [
    `
      .is-invalid {
        border: 1px solid red;
      }
      .is-required::after {
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
      select:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background-color: #f2f2f2;
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomMultiSelectComponent),
      multi: true
    }
  ]
})
export class CustomMultiSelectComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() required: boolean = false;
  @Input() disabled!: string;
  @Input() errorMessage: string = 'Invalid selection';
  @Input() placeholder!: string;
  @Input() options: any = [];
  @Input() labelValue: string = '';
  @Input() value: string = '';

  id: string = '';
  _value: any[] = [];
  invalid: boolean = false;
  valid: boolean = false;

  onChange!: (value: any) => void;
  onTouched!: () => void;

  onSelectionChange(event: any) {
    const selectedOptions = Array.from(event.target.selectedOptions);
    this._value = selectedOptions.map((option: any) => option.value);
    this.onChange(this._value);
  }

  onBlur() {
    this.invalid = this.control?.invalid || false;
    this.valid = !this.invalid;
    this.onTouched();
  }

  writeValue(value: any): void {
    this._value = value || [];
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit() {
    this.id = this.label.toLowerCase().replace(' ', '-');
  }
}
