import { TestBed } from '@angular/core/testing';

import { ListOfNonAppliedLoanApplicationsCardService } from './list-of-non-applied-loan-applications-card.service';

describe('ListOfNonAppliedLoanApplicationsCardService', () => {
  let service: ListOfNonAppliedLoanApplicationsCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfNonAppliedLoanApplicationsCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
