import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) { }

  showSuccess(message: string) {
    this.toastr.success(message, 'تمت العملية بنجاح', { timeOut: 2000,positionClass: 'toast-top-center' });
  }

  showError(message: string) {
    this.toastr.error(message, 'خطأ', { timeOut: 2000,positionClass: 'toast-top-center' });
  }
}
