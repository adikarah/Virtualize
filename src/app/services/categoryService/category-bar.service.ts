import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryBarService {

  productType: any
  http: any

  constructor(private https: HttpClient) {
    this.http = https;
  }

  /**
   * This function will fetch the stores name from apis.
   */
  fetchStoresNames(productType: string) {
    const storeNameUrl = environment.productCategoryStoresUrl + "/" + productType;
    return this.http.get(storeNameUrl).pipe(retry(1), catchError(this.httpErrorProduct));
  }

  /**
   *  This function will fetch all the product type name form api.
   */
  fetchProductNames(productType: string) {
    const proudctNameUrl = environment.productCategoryProductsUrl + "/" + productType;
    return this.http.get(proudctNameUrl).pipe(retry(1), catchError(this.httpErrorProduct));
  }

  /**
   * This function will fetch all the product details form apis.
   */
  fetchProductData(productType: string) {
    const productDataUrl = environment.productUrl + "/" + productType;
    return this.http.get(productDataUrl).pipe(retry(1), catchError(this.httpErrorProduct));
  }

  //error handling for product api fail
  httpErrorProduct(error: any) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}\n Due to serve fail, page is not working`;
    }
    return throwError(msg);
  }
}
