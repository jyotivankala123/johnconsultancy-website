import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { HelperService } from '../Helper/helper.service';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiURL: string = environment.apiURL;
  userDetails = new Subject();
  userLocationDetails = new Subject();
  userRegionDetails = new Subject();
  userProfileUpdate = new Subject();
  private changeProfileImage = new BehaviorSubject(0);
  currentImage = this.changeProfileImage.asObservable();
  hotelDetails = new Subject();
  footerFun = new Subject();
  subadminPasswordChange = new Subject();
  notificatonRead = new Subject();
  shopDetails = new Subject();
  productDetails = new Subject();
  callDetails = new Subject();
  statusChangeDetails = new Subject();
  advertisementDetails = new Subject();
  sellerBankDetails = new Subject();
  userLogout = new Subject();
  accessUpdate = new Subject();
  subAdminProfileImg = new Subject();

  cartItemQuantity = new Subject();

  public systemSocket: any;

  constructor(private http: HttpClient,
    private helperService: HelperService) {

  }

  changeImageFunction(message: number) {
    this.changeProfileImage.next(message);
  }

  // Post API Call
  postAPICall(requestData: any) {
    let headers: HttpHeaders = new HttpHeaders();
    if (requestData.contentType) {
      headers = headers.append('Accept', requestData.contentType);
    } else {
      headers = headers.append('Accept', 'application/json');
    }
    if (localStorage.getItem('access-token')) {
      headers = headers.append('Authorization', `Bearer ${localStorage.getItem('access-token')}`)
    }

    return this.http.post<any>(this.apiURL + requestData.url, requestData.data, { headers })
      .pipe(
        catchError(this.helperService.handleError('error ', []))
      );
  }

  // Post Upload API Call
  postUploadAPICall(requestData: any): Observable<HttpEvent<any>> {
    let headers: HttpHeaders = new HttpHeaders();
    if (requestData.contentType) {
      headers = headers.append('Accept', requestData.contentType);
    } else {
      headers = headers.append('Accept', 'application/json');
    }
    if (localStorage.getItem('access-token')) {
      headers = headers.append('Authorization', `Bearer ${localStorage.getItem('access-token')}`)
    }

    const req = new HttpRequest('POST', `${this.apiURL}${requestData.url}`, requestData.data, {
      headers: headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  // Get API Call
  getAPICall(requestData: any) {
    let headers: HttpHeaders = new HttpHeaders();
    if (requestData.contentType) {
      headers = headers.append('Accept', requestData.contentType);
    } else {
      headers = headers.append('Accept', 'application/json');
    }

    if (localStorage.getItem('access-token')) {
      headers = headers.append('Authorization', `Bearer ${localStorage.getItem('access-token')}`)
    }

    let params = new HttpParams();
    for (const key in requestData.data) {
      if (requestData.data.hasOwnProperty(key)) {
        params = params.append(key, requestData.data[key]);
      }
    }

    return this.http.get<any>(this.apiURL + requestData.url, { headers, params })
      .pipe(
        catchError(this.helperService.handleError('error ', []))
      );
  }

  // Put API Call
  putAPICall(requestData: any) {
    let headers: HttpHeaders = new HttpHeaders();
    if (requestData.contentType) {
      headers = headers.append('Accept', requestData.contentType);
    } else {
      headers = headers.append('Accept', 'application/json');
    }
    if (localStorage.getItem('access-token')) {
      headers = headers.append('Authorization', `Bearer ${localStorage.getItem('access-token')}`)
    }
    let params = new HttpParams();
    for (const key in requestData.data) {
      if (requestData.data.hasOwnProperty(key)) {
        params = params.append(key, requestData.data[key]);
      }
    }
    return this.http.put<any>(this.apiURL + requestData.url, requestData.data, { headers, params })
      .pipe(
        catchError(this.helperService.handleError('error ', []))
      );
  }

  // Put API Call
  putAPICallUpdate(requestData: any) {
    let headers: HttpHeaders = new HttpHeaders();
    if (requestData.contentType) {
      headers = headers.append('Accept', requestData.contentType);
    } else {
      headers = headers.append('Accept', 'application/json');
    }
    if (localStorage.getItem('access-token')) {
      headers = headers.append('Authorization', `Bearer ${localStorage.getItem('access-token')}`)
    }

    return this.http.put<any>(this.apiURL + requestData.url, requestData.data, { headers })
      .pipe(
        catchError(this.helperService.handleError('error ', []))
      );
  }

  //Patch API call

  patchAPICall(requestData: any) {
    let headers: HttpHeaders = new HttpHeaders();
    if (requestData.contentType) {
      headers = headers.append('Accept', requestData.contentType);
    } else {
      headers = headers.append('Accept', 'application/json');
    }
    if (localStorage.getItem('access-token')) {
      headers = headers.append('Authorization', `Bearer ${localStorage.getItem('access-token')}`)
    }
    let params = new HttpParams();
    for (const key in requestData.data) {
      if (requestData.data.hasOwnProperty(key)) {
        params = params.append(key, requestData.data[key]);
      }
    }
    return this.http.patch<any>(this.apiURL + requestData.url, requestData.data, { headers, params })
      .pipe(
        catchError(this.helperService.handleError('error ', []))
      );
  }

  // Delete API Call
  deleteAPICall(requestData: any) {
    let headers: HttpHeaders = new HttpHeaders();
    if (requestData.contentType) {
      headers = headers.append('Accept', requestData.contentType);
    } else {
      headers = headers.append('Accept', 'application/json');
    }
    if (localStorage.getItem('access-token')) {
      headers = headers.append('Authorization', `Bearer ${localStorage.getItem('access-token')}`)
    }

    return this.http.delete<any>(this.apiURL + requestData.url, { headers })
      .pipe(
        catchError(this.helperService.handleError('error ', []))
      );
  }


  setUserProfileUpdate(data: any) {
    this.userProfileUpdate.next(data);
  }

  getUserProfileUpdate() {
    return this.userProfileUpdate.asObservable();
  }

  setUserStatus(data: any) {
    this.userDetails.next(data);
  }
  getUserStatus() {
    return this.userDetails.asObservable();
  }

  setLocationUserStatus(data: any) {
    this.userLocationDetails.next(data);
  }
  getLocationUserStatus() {
    return this.userLocationDetails.asObservable();
  }

  setRegionUserStatus(data: any) {
    this.userRegionDetails.next(data);
  }
  getRegionUserStatus() {
    return this.userRegionDetails.asObservable();
  }


  setHomeScreenData(data: any) {
    this.userRegionDetails.next(data);
  }
  getHomeScreenData() {
    return this.userRegionDetails.asObservable();
  }


  setFooter(data: any) {
    this.footerFun.next(data)
  }

  getFooter() {
    return this.footerFun.asObservable();
  }

  setSubadminPassword(data: any) {
    this.subadminPasswordChange.next(data)
  }

  getSubadminPassword() {
    return this.subadminPasswordChange.asObservable();
  }

  setNotificationRead(data: any) {
    this.notificatonRead.next(data)
  }

  getNotificationRead() {
    return this.notificatonRead.asObservable();
  }

  setShopStatusId(data: any) {
    this.shopDetails.next(data);
  }

  getShopStatusId() {
    return this.shopDetails.asObservable();
  }

  setProductStatusId(data: any) {
    this.productDetails.next(data);
  }

  getProductStatusId() {
    return this.productDetails.asObservable();
  }

  setFunctionCall(data: any) {
    this.callDetails.next(data);
  }

  getFunctionCall() {
    return this.callDetails.asObservable();
  }

  setStatusChange(data: any) {
    this.statusChangeDetails.next(data)
  }

  getStatusChange() {
    return this.statusChangeDetails.asObservable();
  }

  setAdvertisementId(data: any) {
    this.advertisementDetails.next(data);
  }

  getAdvertisementId() {
    return this.advertisementDetails.asObservable();
  }

  setUserLogout(data: any) {
    this.userLogout.next(data);
  }

  getUserLogout() {
    return this.userLogout.asObservable();
  }

  setBankDetails(data: any) {
    this.sellerBankDetails.next(data);
  }

  getBankDetails() {
    return this.sellerBankDetails.asObservable();
  }

  setAccessUpdate(data: any) {
    this.accessUpdate.next(data);
  }

  getAccessUpdate() {
    return this.accessUpdate.asObservable();
  }

  setSubAdminImg(data: any) {
    this.subAdminProfileImg.next(data);
  }

  getSubAdminImg() {
    return this.subAdminProfileImg.asObservable();
  }




  setCartItemQuantity(data: any) {
    this.cartItemQuantity.next(data);
  }
  getCartItemQuantity() {
    return this.cartItemQuantity.asObservable();
  }
}
