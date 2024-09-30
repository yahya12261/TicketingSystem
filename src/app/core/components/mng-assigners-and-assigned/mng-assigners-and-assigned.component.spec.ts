import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngAssignersAndAssignedComponent } from './mng-assigners-and-assigned.component';

describe('MngAssignersAndAssignedComponent', () => {
  let component: MngAssignersAndAssignedComponent;
  let fixture: ComponentFixture<MngAssignersAndAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngAssignersAndAssignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngAssignersAndAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
