import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngAdditionalServiceFieldListComponent } from './mng-additional-service-field-list.component';

describe('MngAdditionalServiceFieldListComponent', () => {
  let component: MngAdditionalServiceFieldListComponent;
  let fixture: ComponentFixture<MngAdditionalServiceFieldListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngAdditionalServiceFieldListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngAdditionalServiceFieldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
