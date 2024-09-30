import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { IAdditionalServiceList } from '../../Interfaces/AdditionalServiceList';

@Injectable({
  providedIn: 'root'
})
export class AdditionalServiceFieldListService extends BaseService<IAdditionalServiceList>{
  constructor(http: HttpClient) {
    super(http,"additional-service-list","additional-service-list");
  }
}
