import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './interfaces/app.interface';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
const baseLink = environment.BaseLink;
const AUTH_API = baseLink + '/api/v1/user/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  loggenIn$ = new BehaviorSubject(false);
  constructor(private http: HttpClient) {
    if (this.hasToken()) {
      this.setLoggedIn(true);
    } else {
      this.setLoggedIn(false);
    }
  }
  setLoggedIn(value: boolean) {
    //update loggedin status in loggedIn$ stream.
    this.loggenIn$.next(value);
    if(!value){
      localStorage.clear();
    }

  }
  formData = new FormData();
  hasToken(): boolean {
    //chack user has a token
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
  login(user: User): Observable<any> {
    const formData = new FormData();
    formData.append('username', user.username+"");
    formData.append('password', user.password+"");

    const headers = new HttpHeaders(); // Create HttpHeaders object
    headers.append('Content-Type', 'application/x-www-form-urlencoded'); // Set appropriate content type

    return this.http.post(AUTH_API + 'login', formData, { headers }); // Pass headers in the options parameter
  }
  loginByOTP(user:User):Observable<any>{
    const formData = new FormData();
    formData.append('uuid', user.uuid+"");
    formData.append("OTP", user.OTP+"");
    const headers = new HttpHeaders(); // Create HttpHeaders object
    headers.append('Content-Type', 'application/x-www-form-urlencoded'); // Set appropriate content type
    return this.http.post(AUTH_API + 'loginByOTP', formData, { headers }); // Pass headers in the options parameter
  }

}
