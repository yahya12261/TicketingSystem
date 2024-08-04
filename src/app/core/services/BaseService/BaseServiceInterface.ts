import { Observable } from "rxjs";

interface BaseServiceInterface<T> {
getAll<T>(pageIndex?: number, pageSize?: number,query?:string): Observable<{data:any, success:boolean,message:string, }>
}
