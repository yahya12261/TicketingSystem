import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentDialogComponent } from './government-dialog.component';

describe('GovernmentDialogComponent', () => {
  let component: GovernmentDialogComponent;
  let fixture: ComponentFixture<GovernmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
