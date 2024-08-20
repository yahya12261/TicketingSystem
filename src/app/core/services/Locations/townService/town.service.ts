import { Injectable } from '@angular/core';
import { ITown } from 'src/app/core/Interfaces/Locations/Town';
import { BaseService } from '../../BaseService/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TownService extends BaseService<ITown>{
  constructor(http: HttpClient) {
    super(http,"town","town");
  }
}
