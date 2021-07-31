import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductDataService } from '../services/productService/product-data.service';
import { RecommedationService } from '../services/recommedationService/recommedation.service';

@Component({
  selector: 'app-static-recommedation',
  templateUrl: './static-recommedation.component.html',
  styleUrls: ['./static-recommedation.component.scss']
})

export class StaticRecommedationComponent implements OnInit {

  @Input() startingIndex: number = 0;

  recommedationImageIds: any;
  recommenadtionBox = 3;
  // this variable conatin product image url fetch from environment.ts file.
  recommedationImage = environment.recommedationImage;

  constructor(private _recommedation: RecommedationService, private _productData: ProductDataService) { }

  ngOnInit(): void {

    //array contain recommedation image ids
    this._recommedation.fetchRecommedationImageIds().subscribe(data => {
      this.recommedationImageIds = data

      //to remove first 3 image which are shown in slide recommedation
      this.recommedationImageIds.splice(0, 3);

      //creating subarray for static recommedation
      this.cutingArrayOfRecommedationImageIds(this.startingIndex)
    });
  }

  //recommedation image customing
  cutingArrayOfRecommedationImageIds(startingIndex: number) {
    this.recommedationImageIds = this.recommedationImageIds.splice(startingIndex, 4);
    if (this.recommedationImageIds.length < 4) {
      this.recommenadtionBox = this.recommedationImageIds.length;
    }
    else {
      this.recommenadtionBox = 4;
    }
  }

  //sending the type of product to service
  onTypeOfProduct(type: String) {
    this._productData.typeOfProduct(type);
  }

  /**
   * for grid columns according to images
   * but not more than 4
   */
  gridTemplateColumn() {
    switch (this.recommenadtionBox) {
      case 1:
        return 'repeat(1,1fr)';
        break;
      case 2:
        return 'repeat(2,1fr)';
        break;
      case 3:
        return 'repeat(3,1fr)';
        break;
      default:
        return 'repeat(4,1fr)';
        break;
    }
  }
}
