import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebarService/sidebar.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/ToastService/toast.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isSidebarVisible = false;
  isSubmenuOpen = false;
  isDashboardSelected = false;
  dropdownVisible = false;
  setupDropdown = false;
  setupActionDropDownVisible = false;
  actionDropDownVisible = false;


  constructor(private sidebarService: SidebarService ,  private router: Router,private toaster :ToastService) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }
  toggleDropdownAction(item: any): void {
    this.actionDropDownVisible = !this.actionDropDownVisible;
  }
  setupToggleDropdownAction(item: any): void {
    this.setupActionDropDownVisible = !this.setupActionDropDownVisible;
  }
  setupToggleDropdown(): void {
    this.setupDropdown = !this.setupDropdown;
  }
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar(); // Toggle sidebar state
  }


  toggleSubmenu() {

  }

  goTo(path: string) {
    //console.log(path);
    this.isSubmenuOpen = !this.isSubmenuOpen;
    this.router.navigateByUrl(path);
  }

  selectDashboard() {
    this.isDashboardSelected = true;
  }
  showNotAvailbleNow(){
    this.toaster.showError("هذه الخدمة ليست متاحة حاليًا")
  }
}
