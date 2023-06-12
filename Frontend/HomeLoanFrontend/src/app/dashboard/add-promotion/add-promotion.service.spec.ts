import { TestBed } from '@angular/core/testing';

import { AddPromotionService } from './add-promotion.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AddPromotionService', () => {
  let service: AddPromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[AddPromotionService]
    });
    service = TestBed.inject(AddPromotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
