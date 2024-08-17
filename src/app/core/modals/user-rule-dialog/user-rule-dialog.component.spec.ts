import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRuleDialogComponent } from './user-rule-dialog.component';

describe('UserRuleDialogComponent', () => {
  let component: UserRuleDialogComponent;
  let fixture: ComponentFixture<UserRuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRuleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
