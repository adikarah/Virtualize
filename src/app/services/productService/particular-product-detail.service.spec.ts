import { TestBed } from '@angular/core/testing';

import { ParticularProductDetailService } from './particular-product-detail.service';

describe('ParticularProductDetailService', () => {
  let service: ParticularProductDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticularProductDetailService);
  });

  it('should be created', () => { 
    expect(service).toBeTruthy();
  });

  it('setting local store (productId)',() => {
    let store = {};
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      store[key] = value + '';
    });
    service.set("product Id");
    expect(store).toEqual({ key: '"product Id"' });
  });

  it('setting local store (product type)',() => {
    let store = {};
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      store[key] = value + '';
    });
    service.setType("product type");
    expect(store).toEqual({ type: '"product type"' });
  });

  it('setting local store (product category)',() => {
    let store = {};
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      store[key] = value + '';
    });
    service.setCategory("product category");
    expect(store).toEqual({ category: '"product category"' });
  });

  it('getting local data (productId)',() => {
    let store = {};
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
        store[key] = ' productId '
        return store[key];
      });
    expect(service.get()).toContain('productId');
  });

  it('getting local data (product type)',() => {
    let store = {};
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
        store[key] = ' product type '
        return store[key];
      });
    expect(service.getType()).toContain('product type');
  });

  it('getting local data (getCategory)',() => {
    let store = {};
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
        store[key] = ' getCategory '
        return store[key];
      });
    expect(service.getCategory()).toContain('getCategory');
  });

});
