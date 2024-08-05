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

}
