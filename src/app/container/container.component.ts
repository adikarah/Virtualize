import { Component, ElementRef, OnInit } from '@angular/core';
import { ProductData } from '../interfaces/product-data';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  productData: ProductData[] = [];

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  /**
   * This function will fetch the data from child component.
   * @param data product data
   */
  getProductData(data: ProductData[]) {
    this.productData = data;
  }
}
