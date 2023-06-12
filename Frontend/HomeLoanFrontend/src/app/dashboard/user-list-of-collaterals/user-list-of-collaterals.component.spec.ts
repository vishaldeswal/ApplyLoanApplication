import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListOfCollateralsComponent } from './user-list-of-collaterals.component';

describe('UserListOfCollateralsComponent', () => {
  let component: UserListOfCollateralsComponent;
  let fixture: ComponentFixture<UserListOfCollateralsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListOfCollateralsComponent]
    });
    fixture = TestBed.createComponent(UserListOfCollateralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
