import { TestBed } from '@angular/core/testing';

import { UserListOfCollateralsService } from './user-list-of-collaterals.service';

describe('UserListOfCollateralsService', () => {
  let service: UserListOfCollateralsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListOfCollateralsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
