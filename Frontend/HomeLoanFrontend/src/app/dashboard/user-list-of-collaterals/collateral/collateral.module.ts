import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollateralRoutingModule } from './collateral-routing.module';
import { CollateralComponent } from './collateral.component';
import { CollateralService } from './collateral.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CollateralComponent
  ],
  imports: [
    CommonModule,
    CollateralRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [CollateralService],
  exports: [CollateralComponent]
})
export class CollateralModule { }
