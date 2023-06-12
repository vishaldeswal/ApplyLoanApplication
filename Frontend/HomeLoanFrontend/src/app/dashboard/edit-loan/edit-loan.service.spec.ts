import { TestBed } from '@angular/core/testing';

import { EditLoanService } from './edit-loan.service';

describe('EditLoanService', () => {
  let service: EditLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
