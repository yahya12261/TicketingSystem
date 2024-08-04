import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngPositionComponent } from './mng-position.component';

describe('MngPositionComponent', () => {
  let component: MngPositionComponent;
  let fixture: ComponentFixture<MngPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngPositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
