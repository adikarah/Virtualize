import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RecommedationService } from './recommedation.service';
import { of } from 'rxjs';

describe('RecommedationService', () => {
  let service: RecommedationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(RecommedationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetch recommedation image ids from api', () => {
    var product
    spyOn(service.http,"get").and.returnValue(of("recommedation image ids"));
    service.fetchRecommedationImageIds().subscribe( data => {product = data})
    expect(product).toEqual("recommedation image ids");
  });

});
