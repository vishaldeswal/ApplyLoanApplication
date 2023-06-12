import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollateralComponent } from './collateral.component';

describe('CollateralComponent', () => {
  let component: CollateralComponent;
  let fixture: ComponentFixture<CollateralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollateralComponent]
    });
    fixture = TestBed.createComponent(CollateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
