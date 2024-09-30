import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { HttpClient } from '@angular/common/http';
import { IPersonOperation } from '../../Interfaces/PersonOperation';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonOperationService extends BaseService<IPersonOperation>{
  constructor(http: HttpClient) {
    super(http,"person-operation","person-operation");
  }
// operationId
// serviceId
// nextStatusId
  changeStatus(operationId:number,nextStatusId:number):Observable<{data:string,message:string,success:boolean}>{
    const headers = this.getHeaders();
    return this.http.patch<any>(this.apiUrl+"/change-status", {operationId:operationId,
      nextStatusId:nextStatusId}, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as string,
            message:response.message,
            success:response.success
          });
      })
    );
  }

  changeAssign(data:any):Observable<{data:string,message:string,success:boolean}>{
    const headers = this.getHeaders();
    return this.http.patch<any>(this.apiUrl+"/change-assign", data, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as string,
            message:response.message,
            success:response.success
          });
      })
    );
  }

  getFullOperation(serviceId:number): Observable<{data:IPersonOperation, success:boolean,message:string, }> {
    const headers = this.getHeaders();
    return this.http.get<{ data:IPersonOperation, success:boolean,message:string, }>(this.apiUrl+"/" + serviceId, { headers });
  }
  //change-assign
}
