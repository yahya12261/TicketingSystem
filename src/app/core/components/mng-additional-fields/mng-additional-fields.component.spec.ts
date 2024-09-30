import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngAdditionalFieldsComponent } from './mng-additional-fields.component';

describe('MngAdditionalFieldsComponent', () => {
  let component: MngAdditionalFieldsComponent;
  let fixture: ComponentFixture<MngAdditionalFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngAdditionalFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngAdditionalFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
