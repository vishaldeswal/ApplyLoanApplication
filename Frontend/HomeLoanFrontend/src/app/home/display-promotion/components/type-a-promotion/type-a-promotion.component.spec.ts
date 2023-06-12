import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAPromotionComponent } from './type-a-promotion.component';

describe('TypeAPromotionComponent', () => {
  let component: TypeAPromotionComponent;
  let fixture: ComponentFixture<TypeAPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeAPromotionComponent]
    });
    fixture = TestBed.createComponent(TypeAPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
