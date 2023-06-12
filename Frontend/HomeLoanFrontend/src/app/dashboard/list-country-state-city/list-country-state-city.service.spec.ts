import { TestBed } from '@angular/core/testing';

import { ListCountryStateCityService } from './list-country-state-city.service';
import { HttpClientModule } from '@angular/common/http';

describe('ListCountryStateCityService', () => {
  let service: ListCountryStateCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ListCountryStateCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
