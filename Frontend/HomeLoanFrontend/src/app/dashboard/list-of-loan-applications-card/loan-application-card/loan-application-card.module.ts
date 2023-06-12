import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoanApplicationCardRoutingModule } from './loan-application-card-routing.module';
import { LoanApplicationCardComponent } from './loan-application-card.component';
import { LoanApplicationCardService } from './loan-application-card.service';



@NgModule({
  declarations: [LoanApplicationCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    LoanApplicationCardRoutingModule
  ],
  providers: [
    LoanApplicationCardService
  ],
  exports: [LoanApplicationCardComponent]
})
export class LoanApplicationCardModule { }
