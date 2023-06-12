import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AddPromotionRoutingModule } from './add-promotion-routing.module';
import { AddPromotionComponent } from './add-promotion.component';
import { AddPromotionService } from './add-promotion.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AddPromotionComponent
  ],
  imports: [
    CommonModule,
    AddPromotionRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule, //for dat range input
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatSelectModule
    
  ],
  providers:[
    AddPromotionService,
    DatePipe
  ]
})
export class AddPromotionModule { }
