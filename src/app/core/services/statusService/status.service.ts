import { Injectable } from '@angular/core';
import { IStatus } from '../../Interfaces/Status/Status';
import { BaseService } from '../BaseService/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends BaseService<IStatus>{
  constructor(http: HttpClient) {
    super(http,"status","status");
  }
}
