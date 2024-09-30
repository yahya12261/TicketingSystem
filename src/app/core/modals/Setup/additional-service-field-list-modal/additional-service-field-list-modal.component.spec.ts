import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalServiceFieldListModalComponent } from './additional-service-field-list-modal.component';

describe('AdditionalServiceFieldListModalComponent', () => {
  let component: AdditionalServiceFieldListModalComponent;
  let fixture: ComponentFixture<AdditionalServiceFieldListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalServiceFieldListModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalServiceFieldListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
