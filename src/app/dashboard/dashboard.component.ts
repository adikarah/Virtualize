import { Component, Input, OnInit } from '@angular/core';
import { ProductDataService } from '../services/productService/product-data.service';
import { ProductData } from '../interfaces/product-data';
import { environment } from '../../environments/environment';
import { ParticularProductDetailService } from '../services/productService/particular-product-detail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  @Input() productData: ProductData[] = [];

  // this variable conatin product image url fetch from environment.ts file.
  productImageUrl = environment.productImageUrl;

  flag = 0;
  flag2 = 0;
  change = false;
  flagForNoRecord = false;
  dialogBoxProduct: any;
  productDataStroge = this.productData;

  constructor(private _productDataService: ProductDataService, private particularProductDetailService: ParticularProductDetailService,
    private routerValue: ActivatedRoute) {
  }

  typeOfProduct = this._productDataService.getCategory()

  ngOnInit(): void {
    // it will show loading spinner
    this.change = true;

    //for product data
    this._productDataService.fetchProductData().subscribe((Response: any) => {
      this.productData = Response;
      this.onSreachBar();
      // it will hide loading spinner
      this.change = false;
      this.flagForNoRecord = true;
    },
      (error) => {
        this.change = false;
      }
    );

    //going to user dashboard through url
    this.routerValue.params.subscribe((Data) => {
      this.change = true;
      //setting the category in local store
      this.particularProductDetailService.setCategory(Data.type);
      this.typeOfProduct = Data.type;
      //for product data again calling product details
      this._productDataService.fetchProductData().subscribe((Response: any) => {
        this.productData = Response;
        this.productDataStroge = Response;
        this.onSreachBar();
        this.change = false;
        this.flagForNoRecord = true;
      });
    });

    /**
     * detect the change in the local storage
     */
    this.particularProductDetailService.watchStorage().subscribe((data) => {
      this.onSreachBar();
    });

  }

  //dialog box
  onClickProductData(event: any) {
    this.flag2 = 1;
    this.flag = event;

    //dialog box product data
    this.productData.forEach(product => {
      if (product.productId == this.flag) {
        this.dialogBoxProduct = product;
      }
    });
  }

  //close dialog box
  onclickClose() {
    this.flag2 = 0;
  }

  /**
   * This function will return the maximum discount for the product.
   * @param array dicount list.
   * @returns maximum discount
   */
  getMaximumDiscount(discountArray: any[]): number {
    let maximum = 0;

    discountArray.forEach(discount => {
      maximum = Math.max(maximum, discount.discountPercentage);
    });
    return maximum;
  }

  //send data of product to service
  onClickSendProductDetail(event: any) {
    this.productData.forEach(element => {
      if (element.productId == event) {
        this.particularProductDetailService.setType(element.productName);
        this.particularProductDetailService.set(event)
      }
    })
  }

  //remaining day before expire of product offer
  calculateDiffDays(expiredDate: any) {
    let currentDate: any = new Date();
    if (expiredDate == null || expiredDate == undefined) {
      return -1;
    }
    expiredDate = new Date(expiredDate);
    return Math.floor((expiredDate - currentDate) / (1000 * 60 * 60 * 24));
  }

  /**
   * filter according to search bar
   */
  onSreachBar() {
    this.productData = this.productDataStroge;
    var inputValue = JSON.parse(this.particularProductDetailService.getSearch()).toLocaleLowerCase();
    if (inputValue.length != 0) {
      var filterValue = []
      this.productData.filter(function (data) {
        if (data.brandName.toLocaleLowerCase().includes(inputValue) || data.productName.toLocaleLowerCase().includes(inputValue)) {
          filterValue.push(data)
        }
      })
      this.productData = filterValue;
    }
  }
}
