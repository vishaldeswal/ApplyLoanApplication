import { TestBed } from '@angular/core/testing';

import { CreateCollateralService } from './create-collateral.service';

describe('CreateCollateralService', () => {
  let service: CreateCollateralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCollateralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
