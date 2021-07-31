import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WelcomeAdminService {

  constructor() { }

  temp = null;

  setSelectedShop(data) {
    this.temp = data;
  }

  getSelectedShop() {
    return this.temp;
  }
}
