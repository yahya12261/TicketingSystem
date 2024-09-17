import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngPersonOperationComponent } from './mng-person-operation.component';

describe('MngPersonOperationComponent', () => {
  let component: MngPersonOperationComponent;
  let fixture: ComponentFixture<MngPersonOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngPersonOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngPersonOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
