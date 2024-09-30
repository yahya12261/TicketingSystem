import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngAssignersModalComponent } from './mng-assigners-modal.component';

describe('MngAssignersModalComponent', () => {
  let component: MngAssignersModalComponent;
  let fixture: ComponentFixture<MngAssignersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngAssignersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngAssignersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
