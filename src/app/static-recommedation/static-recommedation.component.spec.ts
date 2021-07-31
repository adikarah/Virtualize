import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StaticRecommedationComponent } from './static-recommedation.component';

describe('StaticRecommedationComponent', () => {
  let component: StaticRecommedationComponent;
  let fixture: ComponentFixture<StaticRecommedationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticRecommedationComponent ],
      imports: [ HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticRecommedationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('recommedation image customing', () => {
    component.recommedationImageIds = [0,1,2,3,4,5,6,7,8,9];
    component.cutingArrayOfRecommedationImageIds(3);
    expect(component.recommedationImageIds).toEqual([3, 4, 5, 6 ]);
  });
});
