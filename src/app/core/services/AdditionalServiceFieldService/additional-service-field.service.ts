import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { IAdditionalServiceFields } from '../../Interfaces/AdditionalServiceFields';

@Injectable({
  providedIn: 'root'
})
export class AdditionalServiceFieldService extends BaseService<IAdditionalServiceFields>{
  constructor(http: HttpClient) {
    super(http,"additional-service-fields","additional-service-fields");
  }
}
