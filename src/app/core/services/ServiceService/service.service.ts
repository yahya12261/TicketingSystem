import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { IService } from '../../Interfaces/Service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseService<IService>{

  constructor(http: HttpClient) {
    super(http,"service","service");
  }
}
