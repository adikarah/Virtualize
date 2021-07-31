import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecommendationComponent } from './add-recommendation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


fdescribe('AddRecommendationComponent', () => {
  let component: AddRecommendationComponent;
  let fixture: ComponentFixture<AddRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecommendationComponent ],
      imports:[HttpClientTestingModule,MatSnackBarModule,MatIconModule,NgbModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Testing addition function',()=>{
  //   expect(component.addition(10,20)).toBe(35);
  // });

  // it('should call the formSubmit method',async () => {
  //   fixture.whenStable().then(()=>{
  //   fixture.detectChanges();
  //   component.recommend.endDate.setValue('2020-12-21')
  //   component.formSubmit();
  //   expect(component.submitted).toBeTruthy();

  //   });
  // });

  it('should render title in a h1 tag', async () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toBe('ADD NEW RECOMMENDATION');
  })
});
