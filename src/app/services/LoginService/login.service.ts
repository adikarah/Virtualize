import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  http: HttpClient
  constructor(http: HttpClient) {
    this.http = http
  }

  //get user
  public getUser(loginUser: any) {
    return this.http.post(`${baseUrl}/user/login`, loginUser);
  }

  public checkValidUser(loginUser: any) {
    // console.log("valid service data", loginUser)
    return this.http.post(`${baseUrl}/validEmail`, loginUser)
  }

  public checkUserExist(loginUser: any) {
    // console.log("service got data", loginUser)
    return this.http.post(`${baseUrl}/loginWithGoogleValidation`, loginUser);
  }

  public generateToken(loginData: any) {
    return "shashank-token";
  }

  //Login user: set token in local storage
  public loginUser(token) {
    localStorage.setItem("token", token);
    return true;
  }

  //isLogin: user is Logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token")
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // Logout: remove token from local storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('google_auth');
    return true;
  }

  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //Set userDetail
  public setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //Set Complete  userDetail
  public setUserCompleteDetail(userDetail) {
    localStorage.setItem('userDetail', JSON.stringify(userDetail))

  }

  public setSelectedShop(shop) {
    localStorage.setItem('selectedShop', JSON.stringify(shop))
  }

  public setSelectedShopId(shopId) {
    localStorage.setItem('selectedShopId', shopId);
  }

  public setSelectedShopName(shopName) {
    localStorage.setItem('selectedShopName', shopName);
  }

  public setSelectedProduct(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product))
  }

  public setSelectedProductId(productId) {
    localStorage.setItem('selectedProductId', productId);
  }

  public setSelectedProductName(productName) {
    localStorage.setItem('selectedProductName', productName);
  }


  public getSelectedShop() {
    let userSelectedShop = localStorage.getItem('selectedShop');
    if (userSelectedShop != null) {
      return JSON.parse(userSelectedShop);
    }
  }

  public getSelectedShopId() {
    return localStorage.getItem('selectedShopId');
  }

  public getSelectedShopName() {
    return localStorage.getItem('selectedShopName');
  }

  public getSelectedProduct() {
    let userSelectedProduct = localStorage.getItem('selectedProduct');
    if (userSelectedProduct != null) {
      return JSON.parse(userSelectedProduct);
    }
  }

  public getSelectedProductId() {
    return localStorage.getItem('selectedProductId')
  }

  public getSelectedProductName() {
    return localStorage.getItem('selectedProductName');
  }

  //getUser
  public gotUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();
      return null;
    }
  }

  //get Complete user detail
  public getUserCompleteDetail() {
    let userDetailStr = localStorage.getItem("userDetail");
    if (userDetailStr != null) {
      return JSON.parse(userDetailStr);
    }
    else {
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole() {
    let user = this.gotUser();
    return user.type;
  }

}
