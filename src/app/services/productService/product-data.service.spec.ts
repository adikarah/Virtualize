import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';


import { ProductDataService } from './product-data.service';

describe('ProductDataService', () => {
  let service: ProductDataService;
  let http: HttpClient;
  var store = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(ProductDataService);

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      store[key] = ' key '
      return store[key];
    });

    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      store[key] = value + '';
    });

    service = TestBed.inject(ProductDataService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getting category from local storage', () => {
    service.typeOfProduct("setValue");
    expect(store).toEqual({ category:  '"setValue"'})
  });

  it('setting the tpye of product in local storage', () => {
    expect(service.getCategory()).toContain('key')
  });

  it('fetch all the product details form apis', () => {
    var product
    spyOn(service.http,"get").and.returnValue(of("product Details"));
    service.fetchProductData().subscribe( data => {product = data})
    expect(product).toEqual("product Details");
  });

});
