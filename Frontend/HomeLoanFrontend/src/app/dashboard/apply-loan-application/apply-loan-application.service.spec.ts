import { TestBed } from '@angular/core/testing';

import { ApplyLoanApplicationService } from './apply-loan-application.service';

describe('ApplyLoanApplicationService', () => {
  let service: ApplyLoanApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyLoanApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
