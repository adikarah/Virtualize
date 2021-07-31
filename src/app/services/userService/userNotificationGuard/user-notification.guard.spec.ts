import { TestBed } from '@angular/core/testing';

import { UserNotificationGuard } from './user-notification.guard';

describe('UserNotificationGuard', () => {
  let guard: UserNotificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserNotificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
