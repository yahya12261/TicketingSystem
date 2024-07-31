import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  template: `
    <div class="dropdown" [class.show]="isOpen">
      <button class="btn btn-secondary dropdown-toggle" type="button" (click)="toggleDropdown()">
        {{ selectedOption }}
      </button>
      <div class="dropdown-menu" [class.show]="isOpen">
        <a class="dropdown-item" href="#" *ngFor="let option of options" (click)="selectOption(option)">
          {{ option }}
        </a>
      </div>
    </div>
  `,
  styles: [
    `.dropdown { position: relative; }`,
    `.dropdown-menu { position: absolute; z-index: 1000; }`,
    `.show { display: block; }`
  ]
})
export class CustomDropdownComponent {
  @Input() options!: string[];
  @Output() optionSelected = new EventEmitter<string>();

  isOpen = false;
  selectedOption!: string;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    this.isOpen = false;
  }
}
