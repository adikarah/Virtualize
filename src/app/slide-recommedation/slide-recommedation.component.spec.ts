import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SlideRecommedationComponent } from './slide-recommedation.component';

describe('SlideRecommedationComponent', () => {
  let component: SlideRecommedationComponent;
  let fixture: ComponentFixture<SlideRecommedationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideRecommedationComponent ],
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    })
    .compileComponents();
  });

 beforeEach(() => {
    fixture = TestBed.createComponent(SlideRecommedationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('use in dots part', () => {
    component.currentSlide(4);
    expect(component.imageId).toBe(4);
  });

  it('previous button on recommedation image', () => {
    component.imageId = 2;
    component.plusSlidesPrev();
    expect(component.imageId).toBe(1);
  });

  it('next button on recommedation image', () => {
    component.imageId = 1;
    component.plusSlidesNext();
    expect(component.imageId).toBe(2);
  });

  it('differences in given time and current time', () => {
    let currentDate: any = new Date();
    expect(component.calculateDifferentTime(currentDate)).toBe(0);
  });

});
