import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCountryStateCityComponent } from './list-country-state-city.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCountryComponent } from './component/add-country/add-country.component';
import { AddCityComponent } from './component/add-city/add-city.component';
import { AddStateComponent } from './component/add-state/add-state.component';
import { EditCityComponent } from './component/edit-city/edit-city.component';
import { EditCountryComponent } from './component/edit-country/edit-country.component';
import { EditStateComponent } from './component/edit-state/edit-state.component';

describe('ListCountryStateCityComponent', () => {
  let component: ListCountryStateCityComponent;
  let fixture: ComponentFixture<ListCountryStateCityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCountryStateCityComponent,AddCountryComponent, AddCityComponent,AddStateComponent, EditCityComponent,EditCountryComponent, EditStateComponent],
       imports:[
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
        BrowserAnimationsModule
       ]
    });
    fixture = TestBed.createComponent(ListCountryStateCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
