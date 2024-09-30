import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { IOperationChanges } from '../../Interfaces/operationChanges';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangesService extends BaseService<IOperationChanges>{

  constructor(http: HttpClient) {
    super(http,"changes","changes");
  }
}
