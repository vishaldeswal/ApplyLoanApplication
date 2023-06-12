import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfLoanApplicationsCardComponent } from './list-of-loan-applications-card.component';

describe('ListOfLoanApplicationsCardComponent', () => {
  let component: ListOfLoanApplicationsCardComponent;
  let fixture: ComponentFixture<ListOfLoanApplicationsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfLoanApplicationsCardComponent]
    });
    fixture = TestBed.createComponent(ListOfLoanApplicationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
