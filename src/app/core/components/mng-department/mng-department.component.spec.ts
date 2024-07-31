import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngDepartmentComponent } from './mng-department.component';

describe('MngDepartmentComponent', () => {
  let component: MngDepartmentComponent;
  let fixture: ComponentFixture<MngDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
