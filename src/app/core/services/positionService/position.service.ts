import { Injectable } from '@angular/core';
import { IPosition } from '../../Interfaces/Position';
import { BaseService } from '../BaseService/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { IRule } from '../../Interfaces/Rule';

@Injectable({
  providedIn: 'root'
})
export class PositionService extends BaseService<IPosition>{

  constructor(http: HttpClient) {
    super(http,"position","position");
  }

  addPageApi(positionId:number,ruleId:number): Observable<{data:IRule,message:string,success:boolean}> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl+"/rule-position", {positionId:positionId,ruleId:ruleId}, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as IRule,
            message:response.message,
            success:response.success
          });
      })
    );
  }
  deletePageApi(positionId:number,ruleId:number): Observable<{data:IRule,message:string,success:boolean}> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl+"/delete_rule_position", {positionId:positionId,ruleId:ruleId}, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as IRule,
            message:response.message,
            success:response.success
          });
      })
    );
  }

  addAssigners(data:{}): Observable<{data:IRule,message:string,success:boolean}> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl+"/assign-perms", data, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as IRule,
            message:response.message,
            success:response.success
          });
      })
    );
  }
  deleteAssigners(data: {}): Observable<{ data: IRule; message: string; success: boolean }> {
    const headers = this.getHeaders();
    return this.http.delete<{ data: IRule; message: string; success: boolean }>(this.apiUrl + "/assign-perms", {
        headers,
        body: data // Include the body here
    }).pipe(
        switchMap((response) => {
            return of({
                data: response.data,
                message: response.message,
                success: response.success
            });
        })
    );
}

getAvailbleUsers(): Observable<{data:any, success:boolean,message:string, }> {
  const headers = this.getHeaders();
  return this.http.get<{ data:any, success:boolean,message:string, }>(this.apiUrl+"/getAssigners", { headers });
}

}
