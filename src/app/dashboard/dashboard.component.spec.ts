import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([]),
        ], 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close dialog box', () => {
    component.flag2 = 2;
    component.onclickClose();
    expect(component.flag2).toEqual(0);
  });

  it('getMaximumDiscount', () => {
    const dummyData = [{discountPercentage: 5}, {discountPercentage: 10}, {discountPercentage:15}];

    let actual = component.getMaximumDiscount(dummyData);

    expect(actual).toEqual(15);
  })
});


