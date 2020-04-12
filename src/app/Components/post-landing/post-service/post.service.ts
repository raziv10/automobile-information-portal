import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiConst} from '../../../ApiConstants/api-const';
import {UserModel} from '../../../custom-common/models/user.model';
// const headers = {
//   headers: new HttpHeaders({ Authorization: 'Basic ' + btoa('web:nZ2#!gRaS$wu'),
//     'Content-type': 'application/x-www-form-urlencoded'})};
const headers = {
  headers: {'Content-Type': 'multipart/form-data'}
};

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private postDetailUrl;

  constructor(private http: HttpClient) {
  }

  getBlogPostData(url): Observable<any> {
    return this.http.get(url);
  }

  getYear() {
    const year = [];
    for (let i = 2000; i <= 2025; i++) {
      year.push(i);
    }
    return year;
  }
  getTransmission(){
    const transmission = ['Manual', 'Automatic'];
    return transmission;
  }
  getDrivetrain(){
    const drivetrain = ['2WD', '4WD'];
    return drivetrain;
  }
  getFuelType(){
    const fuelType = ['Petrol', 'Diesel'];
    return fuelType;
  }
  getBrandList(url): Observable<any>{
    return this.http.get(url);
  }
  // http://127.0.0.1:8000/api/posts/getModelList/?brand=Ford
  getModelPerBrandList(url,brand){
    return this.http.get(url + '?' + 'brand=' + brand);
  }
  //To check if the user is login or not when the user tries to open the post form dialog.
  checkPostAddStatus(url, header): Observable<any>{
    return this.http.get(url, header);
  }
  postBlogContent(payLoad, url: string, header): Observable<any> {
    return this.http.post<any>(ApiConst.SERVER_URL + url, payLoad,header);
  }
  getPostDetail(url): Observable<any>{
    return this.http.get(url);
  }
  setPostDetailUrl(url){
    this.postDetailUrl = url;
  }
  getPostDetailUrl(){
    return this.postDetailUrl;
  }
  getCommentList(url): Observable<any>{
    return this.http.get(url);
  }
  postCommentContent(payLoad, url: string, header): Observable<any> {
    return this.http.post<any>(ApiConst.BASE_URL + ApiConst.COMMENTLIST + ApiConst.COMMENTCREATE + url, payLoad, header);
  }
  editBlogContent(payLoad, slug: string, header): Observable<any> {
    return this.http.put<any>(ApiConst.SERVER_URL + ApiConst.BLOGPOSTLIST + slug + ApiConst.POSTEDIT, payLoad, header);
  }
  deleteBlogPost(slug: string, header): Observable<any> {
    return this.http.delete<any>(ApiConst.SERVER_URL + ApiConst.BLOGPOSTLIST + slug + ApiConst.POSTDELETE, header);
  }
  checkOwnerRequest(slug: string): Observable<any>{
    return this.http.get<any>(ApiConst.SERVER_URL + ApiConst.BLOGPOSTLIST + slug + ApiConst.POSTEDIT);
  }

}
