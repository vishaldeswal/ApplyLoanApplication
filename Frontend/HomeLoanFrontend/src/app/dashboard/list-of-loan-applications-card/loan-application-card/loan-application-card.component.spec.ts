import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApplicationCardComponent } from './loan-application-card.component';

describe('LoanApplicationCardComponent', () => {
  let component: LoanApplicationCardComponent;
  let fixture: ComponentFixture<LoanApplicationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanApplicationCardComponent]
    });
    fixture = TestBed.createComponent(LoanApplicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
