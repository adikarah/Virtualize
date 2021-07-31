import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private _http: HttpClient) { }

  updShop = null;

  log(message: string) {
    // console.log(message)
  }

  public setUpdatedShop(shop) {
    this.updShop = shop;

  }

  public getUpdatedShop() {
    return this.updShop;
  }

  //Add New Store
  public addStore(store) {
    return this._http.post(`${baseUrl}/admin/shop/create`, store);
  }

  //Update Store
  public updateStore(store) {
    return this._http.put(`${baseUrl}/admin/shop/update`, store);
  }

  //Delete Store
  public deleteStore(delstore) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        adminId: delstore.adminId,
        shopId: delstore.shopId,
      },
    };

    return this._http.delete(`${baseUrl}/admin/shop/delete`, options);
  }
}
