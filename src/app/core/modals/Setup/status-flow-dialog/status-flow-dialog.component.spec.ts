import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFlowDialogComponent } from './status-flow-dialog.component';

describe('StatusFlowDialogComponent', () => {
  let component: StatusFlowDialogComponent;
  let fixture: ComponentFixture<StatusFlowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusFlowDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusFlowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
