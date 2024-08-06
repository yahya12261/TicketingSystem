import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

interface SelectOption {
  value: string;
  labelValue: string;
}

@Component({
  selector: 'app-custom-select',
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
      >
        <option *ngIf="!required" [value]="''">{{ placeholder }}</option>
        <option *ngFor="let option of options" [value]="option.value">
          {{ option.labelValue }}
        </option>
      </select>
      <div class="invalid-feedback" *ngIf="invalid">
        {{ control?.errors?.['required'] ? 'حقل إجباري' : errorMessage }}
      </div>
    </div>
  `,
  styles: [
    // Same styles as before
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() errorMessage: string = 'Invalid selection';
  @Input() placeholder: string = 'Select an option';
  @Input() options: SelectOption[] = [];
  @Input() labelValue: string = '';
  @Input() value: string = '';

  id: string = '';
  _value: any;
  invalid: boolean = false;
  valid: boolean = false;

  onChange!: (value: any) => void;
  onTouched!: () => void;

  onSelectionChange(event: any) {
    this._value = event.target.value;
    this.onChange(this._value);
  }

  onBlur() {
    this.invalid = this.control?.invalid || false;
    this.valid = !this.invalid;
    this.onTouched();
  }

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit() {
    this.id = this.label.toLowerCase().replace(' ', '-');
    this.options = this.options.map((option) => ({
      value: this.value,
      labelValue: this.labelValue
    }));
  }
}
