import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationBarComponent } from './notification-bar.component';
import { LoginService } from '../services/LoginService/login.service';
import { ProductDataService } from '../services/productService/product-data.service';

describe('NotificationBarComponent', () => {
  let component: NotificationBarComponent;
  let fixture: ComponentFixture<NotificationBarComponent>;
  let loginService: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ 
      declarations: [ NotificationBarComponent ],
      imports: [ HttpClientTestingModule],
      providers: [ LoginService , ProductDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationBarComponent);
    loginService = TestBed.inject(LoginService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('type of user in notification content for user', () => {
    spyOn(loginService,'getUserRole').and.returnValue('USER');
    component.typeOfUser = 9;
    component.typeOfUsers();
    expect(component.typeOfUser).toEqual(1);
  })

  it('type of user in notification content for admin', () => {
    spyOn(loginService,'getUserRole').and.returnValue('ADMIN');
    component.typeOfUser = 9;
    component.typeOfUsers();
    expect(component.typeOfUser).toEqual(2);
  })

  it('sending the type of product to service' , () => {
    component.typeOfUser = 9
    component.ngOnInit()
    expect(component.typeOfUser).toEqual(0)
  });

});
