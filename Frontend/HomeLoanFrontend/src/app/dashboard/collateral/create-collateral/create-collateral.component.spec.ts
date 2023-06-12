import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollateralComponent } from './create-collateral.component';

describe('CreateCollateralComponent', () => {
  let component: CreateCollateralComponent;
  let fixture: ComponentFixture<CreateCollateralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCollateralComponent]
    });
    fixture = TestBed.createComponent(CreateCollateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
