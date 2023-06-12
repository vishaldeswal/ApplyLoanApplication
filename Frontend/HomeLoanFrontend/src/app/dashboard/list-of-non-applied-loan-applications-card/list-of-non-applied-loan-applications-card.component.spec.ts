import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfNonAppliedLoanApplicationsCardComponent } from './list-of-non-applied-loan-applications-card.component';

describe('ListOfNonAppliedLoanApplicationsCardComponent', () => {
  let component: ListOfNonAppliedLoanApplicationsCardComponent;
  let fixture: ComponentFixture<ListOfNonAppliedLoanApplicationsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfNonAppliedLoanApplicationsCardComponent]
    });
    fixture = TestBed.createComponent(ListOfNonAppliedLoanApplicationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
