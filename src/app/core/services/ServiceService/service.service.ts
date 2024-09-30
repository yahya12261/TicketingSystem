import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { IService } from '../../Interfaces/Service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseService<IService>{

  constructor(http: HttpClient) {
    super(http,"service","service");
  }

  getExtraFields(serviceId:number): Observable<{data:any, success:boolean,message:string, }> {
    const headers = this.getHeaders();
    return this.http.get<{ data:any, success:boolean,message:string, }>(this.apiUrl+"/getAdditionalFields/"+serviceId, { headers });
  }
}
