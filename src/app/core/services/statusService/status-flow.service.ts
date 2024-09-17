import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { HttpClient } from '@angular/common/http';
import { IStatusFlow } from '../../Interfaces/Status/StatusFlow';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusFlowService extends BaseService<IStatusFlow>{
  constructor(http: HttpClient) {
    super(http,"status-flow","status-flow");
  }

 getStatusFlowByCurrentStatusAndServiceId(currentStatusId:number,serviceId:number): Observable<{data:IStatusFlow[],message:string,success:boolean}>{
    const headers = this.getHeaders();
    return this.http.get<{ data: IStatusFlow[], success:boolean,message:string, }>(`${this.apiUrl}/${currentStatusId}/${serviceId}` ,{headers});
  }
}
