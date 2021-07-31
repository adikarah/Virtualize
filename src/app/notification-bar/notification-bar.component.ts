import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/LoginService/login.service';
import { NotificationService } from '../services/notificationService/notification.service';
import { ProductDataService } from '../services/productService/product-data.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss']
})
export class NotificationBarComponent implements OnInit {

  typeOfUser = 2;
  notificationDataLength: any;
  recommedationImage = environment.recommedationImage;

  constructor(private notificationService: NotificationService,
    private _productData: ProductDataService, private loginService: LoginService) { }

  ngOnInit(): void {
    try {
      this.typeOfUsers()
    }
    catch (e) {
      this.typeOfUser = 2;
    }
  }

  //for getting real time notification
  getAllNotification() {
    this.notificationDataLength = this.notificationService.dataLength;
    return this.notificationService.data;
  }

  //sending the type of product to service
  onTypeOfProduct(type: String) {
    this._productData.typeOfProduct(type);
  }

  /**
   * type of user in notification content
   * 0 = user is login and notification bar is empty / visible (user)
   * 1 = user is login and notification bar is not empty / visible (user)
   * 2 = no one is login or admin is login / invisible (non-user and admin)
   */
  typeOfUsers() {
    if (this.loginService.getUserRole() == 'USER') {
      this.typeOfUser = 1;
    }
  }
}
