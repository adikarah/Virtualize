import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class ControlProductsService {

  constructor(private _http: HttpClient) { }

  discountOnProduct = null
  discountByShop = null

  setDiscountProduct(product, store) {
    this.discountOnProduct = product;
    this.discountByShop = store;
  }

  selectedShopProduct = null;
  selectStore(product) {
    this.selectedShopProduct = product;
  }

  getDiscountProduct() {
    return this.discountOnProduct;

  }

  getSelectedStoreProduct() {
    return this.selectedShopProduct;
  }

  updProduct = null;

  public setUpdatedProduct(product) {
    this.updProduct = product;
  }

  public getUpdatedProduct() {
    return this.updProduct;
  }

  //Add New Product
  public addProduct(product) {
    return this._http.post(`${baseUrl}/admin/product/create`, product);
  }

  // Add New Discount
  public addDiscount(discount) {
    return this._http.post(`${baseUrl}/admin/discount/insert`, discount);
  }


  public getCategories() {
    return this._http.get(`${baseUrl}/admin/product/types`);
  }

  public updateProduct(product) {
    return this._http.put(`${baseUrl}/admin/product/update`, product);
  }

  public addRecommendation(recommend) {
    return this._http.post(`${baseUrl}/recommend/insert`, recommend);
  }

  public deleteProduct(delProduct) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        adminId: delProduct.adminId,
        productId: delProduct.productId,
        shopId: delProduct.shopId
      },
    };

    return this._http.delete(`${baseUrl}/admin/product/delete`, options);
  }

  public deleteDiscount(delDiscount) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        adminId: delDiscount.adminId,
        discountId: delDiscount.discountId,
        discountName: delDiscount.discountName,
        productId: delDiscount.productId,
        shopId: delDiscount.shopId
      },
    };
    return this._http.delete(`${baseUrl}/admin/discount/delete`, options);
  }
}
