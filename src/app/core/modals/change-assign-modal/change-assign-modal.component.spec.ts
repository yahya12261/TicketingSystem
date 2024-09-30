import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAssignModalComponent } from './change-assign-modal.component';

describe('ChangeAssignModalComponent', () => {
  let component: ChangeAssignModalComponent;
  let fixture: ComponentFixture<ChangeAssignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAssignModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeAssignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
