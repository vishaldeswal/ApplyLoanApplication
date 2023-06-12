import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListOfCollateralsRoutingModule } from './user-list-of-collaterals-routing.module';
import { UserListOfCollateralsComponent } from './user-list-of-collaterals.component';
import { UserListOfCollateralsService } from './user-list-of-collaterals.service';
import { MatCardModule } from '@angular/material/card';
import { CollateralModule } from './collateral/collateral.module';


@NgModule({
  declarations: [
    UserListOfCollateralsComponent
  ],
  imports: [
    CommonModule,
    UserListOfCollateralsRoutingModule,
    MatCardModule,
    CollateralModule
  ],
  providers: [UserListOfCollateralsService],
  exports: [UserListOfCollateralsComponent]
})
export class UserListOfCollateralsModule { }
