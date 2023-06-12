import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApplicationDetailsComponent } from './loan-application-details.component';

describe('LoanApplicationDetailsForAdvisorComponent', () => {
  let component: LoanApplicationDetailsComponent;
  let fixture: ComponentFixture<LoanApplicationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanApplicationDetailsComponent]
    });
    fixture = TestBed.createComponent(LoanApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
