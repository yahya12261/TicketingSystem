import { Injectable } from '@angular/core';
import { IPosition } from '../../Interfaces/Position';
import { BaseService } from '../BaseService/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PositionService extends BaseService<IPosition>{

  constructor(http: HttpClient) {
    super(http,"position","position");
  }
}
