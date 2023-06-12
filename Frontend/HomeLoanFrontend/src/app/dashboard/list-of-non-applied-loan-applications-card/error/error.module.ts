import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';
import { ErrorService } from './error.service';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    MatCardModule
  ],
  providers: [ErrorService],
  exports: [ErrorComponent]
})
export class ErrorModule { }
