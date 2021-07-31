import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

fdescribe('LoginService', () => {
  let service: LoginService;
  let mockHttpClient;

  beforeEach(() => {
    service= new LoginService(mockHttpClient);
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should set the user',()=>{
  //   var store = {};
  //   spyOn(localStorage, 'setItem').andCallFake(setUser(key) {
  //     return store[key] = value + '';
  //   });

  // });
  it('Testing token generation',()=>{
      let token;
      expect(service.generateToken(token)).toBe("shashank-token");
    });

  // it('Testing get user Role',()=>{
  //   // let response =spyOn(service,'getUserRole');
  //   // console.log(response,"shashank");
  //   expect(service.getUserRole()).toBeNull()
  // });

  it('should return login user data',() =>{
    let login={
      "id": "shashank@test.com",
      "password": "test@123",
      "type": "USER"
    };

    let response;
    spyOn(service.http,'post').and.returnValue(of("mockResponse"));
    service.getUser(login).subscribe(res =>{
      // console.log(res)
      response =res})
    expect(response).toEqual("mockResponse");
  });

  it('should checkValidUser',() =>{
    let login={
      "id": "shashank@test.com",
      "password": "test@123",
      "type": "USER"
    };

    let response;
    spyOn(service.http,'post').and.returnValue(of("mockResponse"));
    service.checkValidUser(login).subscribe(res =>{
      response =res})
    expect(response).toEqual("mockResponse");
  });


});
