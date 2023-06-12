import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddPromotionModule } from './add-promotion/add-promotion.module';
import { ApplyLoanApplicationModule } from './apply-loan-application/apply-loan-application.module';
import { ListCountryStateCityModule } from './list-country-state-city/list-country-state-city.module';
import { ListOfLoanApplicationsCardModule } from './list-of-loan-applications-card/list-of-loan-applications-card.module';
import { LoanApplicationDetailsModule } from './list-of-loan-applications-card/loan-application-card/loan-application-details/loan-application-details.module';
import { ListOfNonAppliedLoanApplicationsCardModule } from './list-of-non-applied-loan-applications-card/list-of-non-applied-loan-applications-card.module';
import { NavbarModule } from './navbar/navbar.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { UserListOfCollateralsModule } from './user-list-of-collaterals/user-list-of-collaterals.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ActivatedRoute } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        DashboardRoutingModule,
        NavbarModule,
        ApplyLoanApplicationModule,
        ListOfLoanApplicationsCardModule,
        UpdatePasswordModule,
        LoanApplicationDetailsModule,
        AddPromotionModule,
        ListCountryStateCityModule,
        ListOfNonAppliedLoanApplicationsCardModule,
        UserListOfCollateralsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        HttpClientModule,
        MatSnackBarModule
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
