import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { IRule } from '../../Interfaces/Rule';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuleService extends BaseService<IRule>{

  constructor(http: HttpClient) {
    super(http,"rule","rule");
  }

  addPageApi(pageId:number,apiId:number): Observable<{data:IRule,message:string,success:boolean}> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl+"/addPageApi", {pageId:pageId,apiId:apiId}, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as IRule,
            message:response.message,
            success:response.success
          });
      })
    );
  }
  deletePageApi(pageId:number,apiId:number): Observable<{data:IRule,message:string,success:boolean}> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl+"/deletePageApi", {pageId:pageId,apiId:apiId}, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as IRule,
            message:response.message,
            success:response.success
          });
      })
    );
  }

}
