import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCPromotionComponent } from './type-c-promotion.component';

describe('TypeCPromotionComponent', () => {
  let component: TypeCPromotionComponent;
  let fixture: ComponentFixture<TypeCPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeCPromotionComponent]
    });
    fixture = TestBed.createComponent(TypeCPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
