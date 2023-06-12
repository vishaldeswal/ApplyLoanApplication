import { TestBed } from '@angular/core/testing';

import { EditCollateralService } from './edit-collateral.service';

describe('EditCollateralService', () => {
  let service: EditCollateralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCollateralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
