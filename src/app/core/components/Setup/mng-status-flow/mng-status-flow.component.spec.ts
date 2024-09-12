import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngStatusFlowComponent } from './mng-status-flow.component';

describe('MngStatusFlowComponent', () => {
  let component: MngStatusFlowComponent;
  let fixture: ComponentFixture<MngStatusFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngStatusFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngStatusFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
