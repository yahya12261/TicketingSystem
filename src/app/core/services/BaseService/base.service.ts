import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, ignoreElements, map, mapTo, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  private apiVersion: string = "v1"
  public apiUrl: string;

  constructor(
    protected http: HttpClient,
    protected entite: string,
    public type: string,
  ) {
     this.apiUrl = `${this.baseLink}/api/${this.apiVersion}/${this.entite}`;
  }
  protected get baseLink(): string {
    return environment.BaseLink;
  }

  protected getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const boundary = this.generateBoundary();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    //   "accept":"*/*",
      'Content-Type': 'application/json'
    });
    return headers;
  }
  // protected getAttachmentHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,


  //     'Content-Type': 'multipart/form-data;'
  //   });
  //   return headers;
  // }

  getAll<T>(pageIndex?: number, pageSize?: number,query?:string,path:string=""): Observable<{data:any, success:boolean,message:string, }> {

    let params = new HttpParams();
    if(query===undefined)
      query = ""
    if (pageIndex !== undefined && pageSize !== undefined) {
      params = params.set('page', pageIndex.toString());
      params = params.set('pageSize', pageSize.toString());
    }

    const url =this.apiUrl+path;
    // "currentPage": 1,
    // "total": 14,
    // "pageSize": 20
    const headers = this.getHeaders();
    return this.http.get<{ data:any, success:boolean,message:string, }>(url+query, { headers, params });
  }
  getAllWithQuery(query:string){
   return this.getAll(undefined,undefined,query)
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    const headers = this.getHeaders();
    return this.http.get<T>(url, { headers });
  }
  private generateBoundary(): string {
    const boundary = '----------' + Math.random().toString().substr(2, 25);
    return boundary;
  }

  getSelectOption<T>(): Observable<{data:any, success:boolean,message:string, }> {
    const headers = this.getHeaders();
    return this.http.get<{ data:any, success:boolean,message:string, }>(this.apiUrl+"/selectOption", { headers });
  }

  create(entity: { [key: string]: any }): Observable<{data:T,message:string,success:boolean}> {
    const headers = this.getHeaders();
    console.log(entity)
    return this.http.post<any>(this.apiUrl, entity, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as T,
            message:response.message,
            success:response.success
          });
      })
    );
  }

  update(entity: T): Observable<{data:T,message:string,success:boolean}> {
    const url = `${this.apiUrl}`;
    const headers = this.getHeaders();
    return this.http.patch<any>(this.apiUrl, entity, { headers }).pipe(
      switchMap((response) => {
          return of({data:response.data as T,
            message:response.message,
            success:response.success
          });
      })
    );
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    const headers = this.getHeaders();
    return this.http.delete<void>(url, { headers });
  }
}
