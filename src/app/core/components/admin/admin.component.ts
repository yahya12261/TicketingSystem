import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  showBaldaModal: boolean = false;
  showServiceModal: boolean = false;
  showWoStatusModal: boolean = false;
onCloseModal(){

this.showBaldaModal = false;
this.showServiceModal =false;
this.showWoStatusModal = false;
}
OpenModal(modal:String){
  this.showBaldaModal = modal==="baldaModal";
  this.showServiceModal = modal ==="statusModal";
  this.showWoStatusModal = modal ==="serviceModal";
}


}
