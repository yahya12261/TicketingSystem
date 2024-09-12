import { Injectable } from '@angular/core';
import { BaseService } from '../../BaseService/base.service';
import { IGovernment } from 'src/app/core/Interfaces/Locations/Government';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GovernmentService extends BaseService<IGovernment>{

  constructor(http: HttpClient) {
    super(http,"government","government");
  }


}

