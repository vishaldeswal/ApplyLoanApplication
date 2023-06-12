import { TestBed } from '@angular/core/testing';

import { LoanApplicationCardService } from './loan-application-card.service';

describe('LoanApplicationCardService', () => {
  let service: LoanApplicationCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanApplicationCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
