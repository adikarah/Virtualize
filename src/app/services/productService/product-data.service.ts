import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  http: HttpClient;
  type: any

  constructor(http: HttpClient) {
    this.http = http;
  }

  //category list of product
  getCategoryList() {
    return this.http.get(environment.categoryList).pipe(retry(1), catchError(this.httpErrorProduct));
  }

  //getting category from local storage and storing it in type
  getCategory() {
    this.type = localStorage.getItem('category');
    const length = this.type.length
    this.type = this.type.substring(1, this.type.length - 1)
    return this.type;
  }

  /**
   * This function will fetch all the product details form apis.
   */
  fetchProductData() {
    this.getCategory()
    const productDataUrl = environment.productUrl + "/" + this.type;
    return this.http.get(productDataUrl).pipe(retry(1), catchError(this.httpErrorProduct));
  }

  //setting the tpye of product
  typeOfProduct(type: String) {
    localStorage.setItem('category', JSON.stringify(type));
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
    Swal.fire('Error !', 'Error on loading data', 'error');
    return throwError(msg);
  }
}
