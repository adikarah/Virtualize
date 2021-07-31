import { TestBed } from '@angular/core/testing';

import { ControlProductsService } from './control-products.service';

describe('ControlProductsService', () => {
  let service: ControlProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
