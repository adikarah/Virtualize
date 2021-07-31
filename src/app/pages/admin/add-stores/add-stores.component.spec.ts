import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoresComponent } from './add-stores.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/LoginService/login.service';

describe('AddStoresComponent', () => {
  let component: AddStoresComponent;
  let fixture: ComponentFixture<AddStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStoresComponent ],
      imports:[HttpClientTestingModule,MatSnackBarModule],
      providers:[LoginService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
