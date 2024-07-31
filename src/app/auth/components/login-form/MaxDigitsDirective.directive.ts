import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
export function maxDigitsValidator(control: FormControl): { [key: string]: boolean }| null {
  if (control.value && control.value.toString().length > 4) {
    return { maxDigits: true };
  }
  return null;
}
@Directive({
  selector: '[appMaxDigits]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxDigitsDirective, multi: true }]
})
export class MaxDigitsDirective implements Validator {
  @Input() appMaxDigits!: boolean;

  validate(control: FormControl): { [key: string]: boolean } |null{
    return this.appMaxDigits ? maxDigitsValidator(control) : null;
  }
}

