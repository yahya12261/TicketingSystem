import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { IDepartment } from '../../Interfaces/Department';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends BaseService<IDepartment>{
  
  constructor(http: HttpClient) {
    super(http,"department","department");
  }
}
