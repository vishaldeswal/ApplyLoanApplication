import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCountryStateCityRoutingModule } from './list-country-state-city-routing.module';
import { ListCountryStateCityComponent } from './list-country-state-city.component';
import { AddCountryComponent } from './component/add-country/add-country.component';
import { AddStateComponent } from './component/add-state/add-state.component';
import { AddCityComponent } from './component/add-city/add-city.component';
import { EditCountryComponent } from './component/edit-country/edit-country.component';
import { EditStateComponent } from './component/edit-state/edit-state.component';
import { EditCityComponent } from './component/edit-city/edit-city.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CountryNamePipe } from './country-name.pipe';
import { StateNamePipe } from './state-name.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ListCountryStateCityComponent,
    AddCountryComponent,
    AddStateComponent,
    AddCityComponent,
    EditCountryComponent,
    EditStateComponent,
    EditCityComponent,
    CountryNamePipe,
    StateNamePipe
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule, 
    MatInputModule,
    MatSelectModule,
    ListCountryStateCityRoutingModule
  ]
})
export class ListCountryStateCityModule { }
