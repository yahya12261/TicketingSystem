import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngPersonComponent } from './mng-person.component';

describe('MngPersonComponent', () => {
  let component: MngPersonComponent;
  let fixture: ComponentFixture<MngPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
