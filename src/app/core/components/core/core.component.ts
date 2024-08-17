import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebarService/sidebar.service';
import { PermissionCheckDirective } from '../../directive/permission-check.directive';
import { CoreAuthService } from '../../services/coreAuthService/core-auth.service';
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent {

  isSidebarVisible = true;
  constructor(private sidebarService: SidebarService,private coreAuthService:CoreAuthService) {}
  ngOnInit() {
    this.coreAuthService.loadUserPermissions();
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }


}
