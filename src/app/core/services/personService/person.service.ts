import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { IPerson } from '../../Interfaces/Person';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends BaseService<IPerson>{

  constructor(http: HttpClient) {
    super(http,"person","person");
  }
}
