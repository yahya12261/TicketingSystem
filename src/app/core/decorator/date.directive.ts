import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDateFormat]'
})
export class DateFormatDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      this.el.nativeElement.classList.add('invalid');
    } else {
      const formattedDate = this.getFormattedDate(date);
      this.el.nativeElement.value = formattedDate;
      this.el.nativeElement.classList.remove('invalid');
    }
  }

  private getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
