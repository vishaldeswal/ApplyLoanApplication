import { TestBed } from '@angular/core/testing';

import { LoanApplicationDetailsService } from './loan-application-details.service';

describe('LoanApplicationDetailsService', () => {
  let service: LoanApplicationDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanApplicationDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
