import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionRuleDialogComponent } from './position-rule-dialog.component';

describe('PositionRuleDialogComponent', () => {
  let component: PositionRuleDialogComponent;
  let fixture: ComponentFixture<PositionRuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionRuleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionRuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
