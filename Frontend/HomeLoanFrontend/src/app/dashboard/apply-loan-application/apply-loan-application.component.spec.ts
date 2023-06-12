import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLoanApplicationComponent } from './apply-loan-application.component';

describe('ApplyLoanApplicationComponent', () => {
  let component: ApplyLoanApplicationComponent;
  let fixture: ComponentFixture<ApplyLoanApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyLoanApplicationComponent]
    });
    fixture = TestBed.createComponent(ApplyLoanApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
