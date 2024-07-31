import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebarService/sidebar.service';
import { ConfirmationDialogComponent } from '../../modals/confirmation-dialog/confirmation-dialog.component';
import { ApiService } from 'src/app/auth/Auth-Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showConfirmationDialog = false;
  msg = "هل أنت متأكد من أنك تريد تسجيل الخروج؟";
title = "تسجيل الخروج";
  constructor(private sidebarService: SidebarService,private apiService: ApiService,private router: Router,) {}

  toggleSidebar() {
  // Check if the button click event is registered
    this.sidebarService.toggleSidebar();
    // Check if the visibility state is changing
  }

  openConfirmationDialog(): void {
    this.showConfirmationDialog = true;
  }

  onYesClicked(): void {
    // Perform the desired action
    this.showConfirmationDialog = false;
      this.apiService.setLoggedIn(false);
      this.router.navigateByUrl('auth/login');
  }

  onNoClicked(): void {
    // Handle cancellation
    this.showConfirmationDialog = false;
  }

}
