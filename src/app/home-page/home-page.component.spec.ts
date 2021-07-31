import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomePageComponent } from './home-page.component';
import { ProductDataService } from '../services/productService/product-data.service';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ProductDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('variable checking' , () => {
    expect(component.typesOfProduct).toEqual(["CLOTHS", "RESTAURANT", "MEDICINE", "FUNRITURE", "KITCHEN_UTENSILS"]);
    expect(component.allTypesOfProduct).toEqual(["CLOTHS", "RESTAURANT", "MEDICINE", "FUNRITURE", "KITCHEN_UTENSILS"]);
  });
});
