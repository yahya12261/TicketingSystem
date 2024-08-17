import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { CoreAuthService } from '../services/coreAuthService/core-auth.service';

@Directive({
  selector: '[permissionCheck]'
})
export class PermissionCheckDirective implements OnInit {
  @Input() permissionCheck!: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: CoreAuthService
  ) {}

  ngOnInit() {
    this.authService.loadUserPermissions().subscribe((data) => {
      this.authService.setPermistions(data.data);
      this.checkPermission();
    });
  }

  checkPermission() {
    if (this.authService.hasPermission(this.permissionCheck)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
