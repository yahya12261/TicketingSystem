import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngStatusComponent } from './mng-status.component';

describe('MngStatusComponent', () => {
  let component: MngStatusComponent;
  let fixture: ComponentFixture<MngStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
