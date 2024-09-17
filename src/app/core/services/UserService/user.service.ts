import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../Interfaces/User';
import { Observable, of, switchMap } from 'rxjs';
import { IRule } from '../../Interfaces/Rule';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<IUser>{
  constructor(http: HttpClient) {
    super(http,"user","user");
  }
  activateDeactivateChangePassword(uuid:string):Observable<{data:string,message:string,success:boolean}>{
    const headers = this.getHeaders();
    return this.http.patch<any>(this.apiUrl+"/activate-deactivate-change-password", {uuid:uuid}, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as string,
            message:response.message,
            success:response.success
          });
      })
    );
  }
  activateDeactivate(uuid:string):Observable<{data:string,message:string,success:boolean}>{
    const headers = this.getHeaders();
    return this.http.patch<any>(this.apiUrl+"/activate-deactivate", {uuid:uuid}, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as string,
            message:response.message,
            success:response.success
          });
      })
    );
  }
  addUserRule(userId:number,ruleId:number): Observable<{data:IRule,message:string,success:boolean}> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl+"/add-rule", {userId:userId,ruleId:ruleId}, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as IRule,
            message:response.message,
            success:response.success
          });
      })
    );

  }
  deleteUserRule(userId:number,ruleId:number): Observable<{data:IRule,message:string,success:boolean}> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl+"/delete-rule", {userId:userId,ruleId:ruleId}, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as IRule,
            message:response.message,
            success:response.success
          });
      })
    );
  }
  getOneByUUID(uuid:string): Observable<{data:IUser,message:string,success:boolean}>{
    const headers = this.getHeaders();
    return this.http.get<{ data:any, success:boolean,message:string, }>(this.apiUrl + "/" + uuid ,{headers});
  }
}
