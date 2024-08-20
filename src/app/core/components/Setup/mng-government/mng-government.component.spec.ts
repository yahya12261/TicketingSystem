import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngGovernmentComponent } from './mng-government.component';

describe('MngGovernmentComponent', () => {
  let component: MngGovernmentComponent;
  let fixture: ComponentFixture<MngGovernmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngGovernmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngGovernmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
