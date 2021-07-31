import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticularProductDetailService {

  private storageSub = new Subject<String>();
  constructor() { }

  /**
   * detect the change in local storage
   * for category and searchText
   */
  watchStorage() {
    return this.storageSub.asObservable();
  }

  //setting local store (productId)
  set(data: any): void {
    localStorage.setItem('key', JSON.stringify(data));
  }

  //setting local store (product type)
  setType(data: any): void {
    localStorage.setItem('type', JSON.stringify(data));
  }

  //setting local store (product category)
  setCategory(category: any): void {
    localStorage.setItem('category', JSON.stringify(category));
    this.storageSub.next('changed');
  }

  //setting local store (searching text)
  setSearch(searchText: any): void {
    localStorage.setItem('searchText', JSON.stringify(searchText));
    this.storageSub.next('changed');
  }

  //getting local data (productId)
  get(): any {
    return localStorage.getItem('key');
  }

  //getting local data (product type or product name like jean)
  getType(): any {
    return localStorage.getItem('type');
  }

  //getting local data (getCategory)
  getCategory(): any {
    return localStorage.getItem('category');
  }

  //getting local data (searching text)
  getSearch(): any {
    return localStorage.getItem('searchText');
  }
}
