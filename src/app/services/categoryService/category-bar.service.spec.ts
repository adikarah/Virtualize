import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CategoryBarService } from './category-bar.service';
import { of } from 'rxjs';

describe('CategoryBarService', () => {
  let service: CategoryBarService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(CategoryBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetch the stores name from apis', () => {
    var product
    spyOn(service.http,"get").and.returnValue(of("product stores name"));
    service.fetchStoresNames("product stores name").subscribe( data => {
       product = data
      });
    expect(product).toEqual("product stores name")
  });

  it('fetch all the product type name form api', () => {
    var product
    spyOn(service.http,"get").and.returnValue(of("product type name"));
    service.fetchProductNames("product type name").subscribe( data => {
       product = data
      });
    expect(product).toEqual("product type name")
  });

  it('fetch all the product details form apis', () => {
    var product
    spyOn(service.http,"get").and.returnValue(of("product details"));
    service.fetchProductData("product details").subscribe( data => {
       product = data;
      });
    expect(product).toEqual("product details")
  });

});
