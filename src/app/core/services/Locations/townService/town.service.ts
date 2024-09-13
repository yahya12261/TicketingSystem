import { Injectable } from '@angular/core';
import { ITown } from 'src/app/core/Interfaces/Locations/Town';
import { BaseService } from '../../BaseService/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TownService extends BaseService<ITown>{
  constructor(http: HttpClient) {
    super(http,"town","town");
  }
  getSelectOptionByCazaId<T>(cazaId?:number): Observable<{data:any, success:boolean,message:string, }> {
    if(!cazaId){
      return this.getSelectOption();
    }
    const headers = this.getHeaders();
    return this.http.get<{ data:any, success:boolean,message:string, }>(this.apiUrl+"/selectOption/"+cazaId, { headers });
  }
}
