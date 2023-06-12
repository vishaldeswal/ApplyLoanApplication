import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { NavbarModule } from './navbar/navbar.module';
import { ApplyLoanApplicationModule } from './apply-loan-application/apply-loan-application.module';
import { ListOfLoanApplicationsCardModule } from './list-of-loan-applications-card/list-of-loan-applications-card.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { LoanApplicationDetailsModule } from './list-of-loan-applications-card/loan-application-card/loan-application-details/loan-application-details.module';
import { AddPromotionModule } from './add-promotion/add-promotion.module';
import { ListCountryStateCityModule } from './list-country-state-city/list-country-state-city.module';
import { ListOfNonAppliedLoanApplicationsCardModule } from './list-of-non-applied-loan-applications-card/list-of-non-applied-loan-applications-card.module';
import { UserListOfCollateralsModule } from './user-list-of-collaterals/user-list-of-collaterals.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditLoanComponent } from './edit-loan/edit-loan.component';
import { ErrorModule } from './list-of-loan-applications-card/error/error.module';


@NgModule({
  declarations: [
    DashboardComponent,
    EditLoanComponent
  ],
  imports: [
    CommonModule,
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
  ],
  providers: [DashboardService],
  exports: [DashboardComponent]
})
export class DashboardModule { }
