import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStateComponent } from './edit-state.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditStateComponent', () => {
  let component: EditStateComponent;
  let fixture: ComponentFixture<EditStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStateComponent],
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
        BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(EditStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
