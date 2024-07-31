import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebarService/sidebar.service';
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})

export class CoreComponent {

  isSidebarVisible = true;
  constructor(private sidebarService: SidebarService) {}


  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }


}
