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


  //change-assign
}
