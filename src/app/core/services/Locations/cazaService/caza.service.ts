import { Injectable } from '@angular/core';
import { BaseService } from '../../BaseService/base.service';
import { HttpClient } from '@angular/common/http';
import { IGovernment } from 'src/app/core/Interfaces/Locations/Government';
import { ICaza } from 'src/app/core/Interfaces/Locations/Caza';

@Injectable({
  providedIn: 'root'
})
export class CazaService extends BaseService<ICaza>{

  constructor(http: HttpClient) {
    super(http,"caza","caza");
  }
}
