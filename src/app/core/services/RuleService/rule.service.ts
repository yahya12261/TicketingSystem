import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService/base.service';
import { IRule } from '../../Interfaces/Rule';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RuleService extends BaseService<IRule>{

  constructor(http: HttpClient) {
    super(http,"rule","rule");
  }
}
