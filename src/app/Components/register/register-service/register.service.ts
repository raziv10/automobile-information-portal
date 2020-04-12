import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../../custom-common/models/user.model';
import {ApiConst} from '../../../ApiConstants/api-const';


const headers = {
  headers: new HttpHeaders({ Authorization: 'Basic ' + btoa('web:nZ2#!gRaS$wu'),
    'Content-type': 'application/x-www-form-urlencoded'})};
// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'})
// };
@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private http: HttpClient) { }

  postRegisterRequest(loginPayLoad: string, url: string): Observable<UserModel> {
    return this.http.post<UserModel>(ApiConst.SERVER_URL + url, loginPayLoad, headers);
  }
}
