import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollateralDialogComponent } from './collateral-dialog.component';

describe('CollateralDialogComponent', () => {
  let component: CollateralDialogComponent;
  let fixture: ComponentFixture<CollateralDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollateralDialogComponent]
    });
    fixture = TestBed.createComponent(CollateralDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
