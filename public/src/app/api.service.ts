import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  regNewUser(newUser) {
      return this._http.post('/api/create', newUser).map(Response=>Response.json()).toPromise()
  }

  getCurrentUser(){
      return this._http.get('/api').map(Response=>Response.json()).toPromise()
  }

  authenticate(user) {
      return this._http.post('/api/auth', user).map(Response=>Response.json()).toPromise()
  }

  checkAuth() {
      return this._http.get('/api/auth-check').map(Response=>Response.json()).toPromise()
  }

  logout() {
      return this._http.get('/api/logout').map(Response=>Response.json()).toPromise()
  }

}
