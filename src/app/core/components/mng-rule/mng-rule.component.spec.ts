import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngRuleComponent } from './mng-rule.component';

describe('MngRuleComponent', () => {
  let component: MngRuleComponent;
  let fixture: ComponentFixture<MngRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
