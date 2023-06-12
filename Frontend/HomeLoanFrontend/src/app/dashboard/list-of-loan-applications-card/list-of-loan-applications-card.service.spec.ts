import { TestBed } from '@angular/core/testing';

import { ListOfLoanApplicationsCardService } from './list-of-loan-applications-card.service';

describe('ListOfLoanApplicationsCardService', () => {
  let service: ListOfLoanApplicationsCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfLoanApplicationsCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
