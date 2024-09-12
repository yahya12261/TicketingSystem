import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { HttpClient } from '@angular/common/http';
import { IStatusFlow } from '../../Interfaces/Status/StatusFlow';

@Injectable({
  providedIn: 'root'
})
export class StatusFlowService extends BaseService<IStatusFlow>{
  constructor(http: HttpClient) {
    super(http,"status-flow","status-flow");
  }
}
