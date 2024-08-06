import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<IUser>{
  constructor(http: HttpClient) {
    super(http,"user","user");
  }
}
