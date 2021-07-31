import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../services/notificationService/notification.service';
import { ProductDataService } from '../services/productService/product-data.service';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss']
})
export class NotificationPageComponent implements OnInit {

  recommedationImage = environment.recommedationImage;
  constructor(private notificationService: NotificationService, private _productData: ProductDataService) { }

  ngOnInit(): void {
  }

  getAllNotification() {
    return this.notificationService.data;
  }

  //sending the type of product to service
  onTypeOfProduct(type: String) {
    this._productData.typeOfProduct(type);
  }
}
