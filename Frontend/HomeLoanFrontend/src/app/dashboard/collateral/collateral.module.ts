import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { CollateralRoutingModule } from './collateral-routing.module';
import { CreateCollateralComponent } from './create-collateral/create-collateral.component';
import { CollateralDialogComponent } from './collateral-dialog/collateral-dialog.component';
import { EditCollateralComponent } from './edit-collateral/edit-collateral.component';
@NgModule({
  declarations: [
    CreateCollateralComponent,
    CollateralDialogComponent,
    EditCollateralComponent
  ],
  imports: [
    CommonModule,
    CollateralRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class CollateralModule { }
