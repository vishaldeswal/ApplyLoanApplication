import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOfLoanApplicationsCardRoutingModule } from './list-of-loan-applications-card-routing.module';
import { ListOfLoanApplicationsCardComponent } from './list-of-loan-applications-card.component';
import { ListOfLoanApplicationsCardService } from './list-of-loan-applications-card.service';
import { LoanApplicationCardModule } from './loan-application-card/loan-application-card.module';
import { MatCardModule } from '@angular/material/card';
import { ErrorModule } from './error/error.module';


@NgModule({
  declarations: [
    ListOfLoanApplicationsCardComponent
  ],
  imports: [
    CommonModule,
    ListOfLoanApplicationsCardRoutingModule,
    LoanApplicationCardModule,
    MatCardModule,
    ErrorModule
  ],
  providers: [ListOfLoanApplicationsCardService],
  exports: [ListOfLoanApplicationsCardComponent]
})
export class ListOfLoanApplicationsCardModule { }
