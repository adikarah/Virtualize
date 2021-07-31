import { TestBed } from '@angular/core/testing';

import { WelcomeAdminService } from './welcome-admin.service';

describe('WelcomeAdminService', () => {
  let service: WelcomeAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomeAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
