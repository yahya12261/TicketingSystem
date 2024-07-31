import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  @Input() message!: string;
  @Input() title!: string;
  @Output() yesClicked = new EventEmitter<void>();
  @Output() noClicked = new EventEmitter<void>();

  onYesClick(): void {
    this.yesClicked.emit();
  }

  onNoClick(): void {
    this.noClicked.emit();
  }
}
