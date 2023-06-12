import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanApplicationDetailsRoutingModule } from './loan-application-details-routing.module';
import { LoanApplicationDetailsComponent } from './loan-application-details.component';
import { LoanApplicationDetailsService } from './loan-application-details.service';



@NgModule({
  declarations: [LoanApplicationDetailsComponent],
  imports: [
    CommonModule,
    LoanApplicationDetailsRoutingModule
  ],
  providers: [LoanApplicationDetailsService],
  exports: [LoanApplicationDetailsComponent]
})
export class LoanApplicationDetailsModule { }
