import { Component, OnInit } from '@angular/core';
import { ParticularProductDetailService } from '../services/productService/particular-product-detail.service'
import { ProductDataService } from '../services/productService/product-data.service';
import { ProductData } from '../interfaces/product-data';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})

export class ProductPageComponent implements OnInit {

  product: ProductData[] = [];
  recommededDiscountPercentage = [];
  productId: number = 1;
  productData: any
  productImageUrl = environment.productImageUrl;
  productCategory: any
  expansionPlane: number[] = [];
  productExpansionPlane = 0;
  loaded = false;
  recommatedProduct = [];
  recommatedProductName: any;
  paginationReommendation = [];
  pageNumber = 0;

  constructor(private _productDataService: ProductDataService,
    private _particularProductDataService: ParticularProductDetailService) {
  }

  ngOnInit(): void {
    this.productCategory = JSON.parse(this._particularProductDataService.getCategory());
    this._productDataService.typeOfProduct(this.productCategory);

    //for product data
    this._productDataService.fetchProductData().subscribe((Response: any) => {
      this.productId = parseInt(JSON.parse(this._particularProductDataService.get()))
      this.recommatedProductName = JSON.parse(this._particularProductDataService.getType())
      this.product = Response;
      this.storeParticularProductDetail();
      this.differentiateDiscount();
      this.filterRecommedation();
      this.paginationReommendation = this.recommatedProduct.slice(this.pageNumber, 4);
      this.loaded = true;
    });

  }

  //remaining day before expire of product offer
  calculateDiffDays(expiredDate: any) {
    let currentDate: any = new Date();
    if (expiredDate == null) {
      return -1;
    }
    expiredDate = new Date(expiredDate);
    return Math.floor((expiredDate - currentDate) / (1000 * 60 * 60 * 24));
  }

  //storing particular product detail
  storeParticularProductDetail() {
    this.product.forEach(element => {
      if (element.productId == this.productId) {
        this.productData = element;
      }
    });
    this._productDataService.getCategory();
  }

  //array with 1 for explansion plane to differentiate decsribsion of discount
  differentiateDiscount() {
    this.productData.productDiscounts.forEach(element => {
      this.expansionPlane.push(0);
    });
  }

  //Expansion Plane opening and closing discount
  onExpansionPlane(indexDiscount: number) {
    if (this.expansionPlane[indexDiscount] == 0) {
      this.expansionPlane[indexDiscount] = 1;
    }
    else {
      this.expansionPlane[indexDiscount] = 0;
    }
  }

  //Expansion Plane opening and closing for product
  onProductExpansionPlane() {
    if (this.productExpansionPlane == 0) {
      this.productExpansionPlane = 1;
    }
    else {
      this.productExpansionPlane = 0;
    }
  }

  //recommendation filtering
  filterRecommedation() {
    var noDiscountSameNameAsCurrentProduct = [];
    var noDiscountDifferentNameAsCurrentProduct = [];
    var discountDifferentNameAsCurrentProduct = [];

    this.product.forEach(element => {
      /*
          storing product which have same product name as current product shown (e.i jean)
          in one array and other in another one which same category
        */
      if (element.productName == this.recommatedProductName) {

        /*removing current product from array which will contain
         same productname as current product*/
        if (element.productId != this.productData.productId) {

          //seperating discount and no-discount product
          if (element.productDiscounts.length) {
            this.recommatedProduct.push(element);
          }
          else {
            noDiscountSameNameAsCurrentProduct.push(element);
          }
        }
      }
      else {
        /**
         * seperating product with discount and without discount
         * which having different product name from current product
         */
        if (element.productDiscounts.length) {
          discountDifferentNameAsCurrentProduct.push(element);
        }
        else {
          noDiscountDifferentNameAsCurrentProduct.push(element);
        }
      }
    });

    /**
     * sort the recommended product on minimum discountprice with discount product
     */
    this.recommatedProduct.sort((a, b) =>
      (a.productPrice - (a.productPrice * this.getMaximumDiscount(a.productDiscounts) * 0.01)) - (b.productPrice - (b.productPrice * this.getMaximumDiscount(b.productDiscounts) * 0.01))
    );

    discountDifferentNameAsCurrentProduct.sort((a, b) =>
      (a.productPrice - (a.productPrice * this.getMaximumDiscount(a.productDiscounts) * 0.01)) - (b.productPrice - (b.productPrice * this.getMaximumDiscount(b.productDiscounts) * 0.01))
    );

    /**
     * sort the recommended product on minimum price without discount product
     */
    noDiscountSameNameAsCurrentProduct.sort((a, b) => a.productPrice - b.productPrice);
    noDiscountDifferentNameAsCurrentProduct.sort((a, b) => a.productPrice - b.productPrice);

    noDiscountSameNameAsCurrentProduct.forEach(element => {
      this.recommatedProduct.push(element);
    });
    discountDifferentNameAsCurrentProduct.forEach(element => {
      this.recommatedProduct.push(element);
    });
    noDiscountDifferentNameAsCurrentProduct.forEach(element => {
      this.recommatedProduct.push(element);
    });
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
  onClickSendProductDetail(event: any, type: any) {
    this._particularProductDataService.set(event);
    this._particularProductDataService.setType(type)
    window.location.reload();
  }

  //next set of recommendation product (pagination)
  onNext() {
    if ((this.pageNumber + 4) < this.recommatedProduct.length) {
      this.pageNumber = this.pageNumber + 4
    }
    this.paginationReommendation = this.recommatedProduct.slice(this.pageNumber, this.pageNumber + 4)
  }

  //previous set of recommendation product (pagination)
  onPre() {
    if (0 <= (this.pageNumber - 4)) {
      this.pageNumber = this.pageNumber - 4
    }
    this.paginationReommendation = this.recommatedProduct.slice(this.pageNumber, this.pageNumber + 4);
  }
}
