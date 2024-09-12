import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngServiceComponent } from './mng-service.component';

describe('MngServiceComponent', () => {
  let component: MngServiceComponent;
  let fixture: ComponentFixture<MngServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
