import { Injectable } from '@angular/core';
import { BaseService } from '../../BaseService/base.service';
import { HttpClient } from '@angular/common/http';
import { IGovernment } from 'src/app/core/Interfaces/Locations/Government';
import { ICaza } from 'src/app/core/Interfaces/Locations/Caza';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CazaService extends BaseService<ICaza>{

  constructor(http: HttpClient) {
    super(http,"caza","caza");
  }

  getSelectOptionByGovId<T>(govId?:number): Observable<{data:any, success:boolean,message:string, }> {
    if(!govId){
      return this.getSelectOption();
    }
    const headers = this.getHeaders();
    return this.http.get<{ data:any, success:boolean,message:string, }>(this.apiUrl+"/selectOption/"+govId, { headers });
  }
}
