import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParticularProductDetailService } from '../services/productService/particular-product-detail.service';
import { ProductDataService } from '../services/productService/product-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  allTypesOfProduct: any;
  typesOfProduct: any;

  typesOfProductImage = ["../../assets/images/clothes.png", "../../assets/images/funriture.png", "../../assets/images/medician.jpg",
    "../../assets/images/kitchen.png", "../../assets/images/restaurant.png"];

  constructor(private productDataService: ProductDataService,
    private particularProductDetailService: ParticularProductDetailService) {
    this.particularProductDetailService.setCategory("CATEGORY");
    this.particularProductDetailService.setSearch("");
  }

  ngOnInit(): void {
    this.productDataService.getCategoryList().subscribe((data) => {
      this.allTypesOfProduct = data;
      this.typesOfProduct = this.allTypesOfProduct;
    })
  }

  //sending the type of product to service
  onTypeOfProduct(type: String) {
    this.productDataService.typeOfProduct(type);
  }
}