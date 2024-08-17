import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/Auth-Services/interfaces/app.interface';
import { BaseService } from '../BaseService/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreAuthService extends BaseService<User>{
  private permissions:any
  constructor(http: HttpClient) {
    super(http,"user","user");
  }

  loadUserPermissions() : Observable<{data:any, success:boolean,message:string, }>{
    const headers = this.getHeaders();
    return this.http.get<{ data:any, success:boolean,message:string, }>(this.apiUrl+"/getPermissions", { headers });
  }

  hasPermission(permission: string): boolean {
    console.log("this", this.permissions);
    console.log("sent", permission);
    if(Array.isArray(this.permissions)){
      return this.permissions.some(perm => perm.name === permission);
    }
    return false;
  }
  setPermistions(permistions:any){
    this.permissions = permistions;
  }
}
