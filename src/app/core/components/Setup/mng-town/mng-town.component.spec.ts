import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngTownComponent } from './mng-town.component';

describe('MngTownComponent', () => {
  let component: MngTownComponent;
  let fixture: ComponentFixture<MngTownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngTownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
