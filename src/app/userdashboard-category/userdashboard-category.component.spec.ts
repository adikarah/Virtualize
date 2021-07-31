import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdashboardCategoryComponent } from './userdashboard-category.component';

describe('UserdashboardCategoryComponent', () => {
  let component: UserdashboardCategoryComponent;
  let fixture: ComponentFixture<UserdashboardCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdashboardCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdashboardCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
