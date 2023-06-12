import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyLoanApplicationRoutingModule } from './apply-loan-application-routing.module';
import { ApplyLoanApplicationComponent } from './apply-loan-application.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ApplyLoanApplicationComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    ApplyLoanApplicationRoutingModule
  ],
  providers: [],
  exports: [ApplyLoanApplicationComponent]
})
export class ApplyLoanApplicationModule { }
