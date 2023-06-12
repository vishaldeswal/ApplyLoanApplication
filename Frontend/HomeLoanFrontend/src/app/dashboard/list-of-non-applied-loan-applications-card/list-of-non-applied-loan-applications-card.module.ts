import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOfNonAppliedLoanApplicationsCardRoutingModule } from './list-of-non-applied-loan-applications-card-routing.module';
import { ListOfNonAppliedLoanApplicationsCardComponent } from './list-of-non-applied-loan-applications-card.component';
import { ListOfNonAppliedLoanApplicationsCardService } from './list-of-non-applied-loan-applications-card.service';
import { LoanApplicationCardModule } from './loan-application-card/loan-application-card.module';
import { MatCardModule } from '@angular/material/card';
import { ErrorModule } from './error/error.module';


@NgModule({
  declarations: [
    ListOfNonAppliedLoanApplicationsCardComponent
  ],
  imports: [
    CommonModule,
    ListOfNonAppliedLoanApplicationsCardRoutingModule,
    LoanApplicationCardModule,
    MatCardModule,
    ErrorModule
  ],
  providers: [ListOfNonAppliedLoanApplicationsCardService],
  exports: [ListOfNonAppliedLoanApplicationsCardComponent]
})
export class ListOfNonAppliedLoanApplicationsCardModule { }
