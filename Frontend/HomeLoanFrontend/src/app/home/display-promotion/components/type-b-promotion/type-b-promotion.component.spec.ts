import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBPromotionComponent } from './type-b-promotion.component';

describe('TypeBPromotionComponent', () => {
  let component: TypeBPromotionComponent;
  let fixture: ComponentFixture<TypeBPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeBPromotionComponent]
    });
    fixture = TestBed.createComponent(TypeBPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
