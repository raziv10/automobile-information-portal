import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiConst} from '../../../ApiConstants/api-const';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private latitude;
  private longitude;
  private companyName;
  constructor(private httpClient: HttpClient,
              private http: HttpClient) {
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(imageUrl, {responseType: 'blob'});
  }

  hitPredictionModelApi(loginPayLoad, url: string): Observable<any> {
    return this.http.post<any>(ApiConst.BASE_URL + url, loginPayLoad);
  }

  getBrandLogo() {
    return this.httpClient.get(ApiConst.BASE_URL + ApiConst.BRANDLOGO);
  }

  getAvailableCarModels() {
    return this.httpClient.get('http://127.0.0.1:8000/getAvailableModel/');
  }

  getSelectedModelInfo(brand, model) {
    // http://127.0.0.1:8000/getCarInfo/?brand=Ford&model=Ecosport
    return this.httpClient.get('http://127.0.0.1:8000/getCarInfo/?' + 'brand=' + brand + '&' + 'model=' + model);
  }
  getLocation(){
    return this.httpClient.get(ApiConst.BASE_URL + ApiConst.LOCATION);
  }
  setMapDetails(latitude:string, longitude:string, company:string){
    this.latitude = latitude;
    this.longitude = longitude;
    this.companyName = company;
  }
  getLatitude(){
    return this.latitude
  }
  getLongitude(){
    return this.longitude;
  }
  getCompany(){
    return this.companyName;
  }
}
