import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngCazaComponent } from './mng-caza.component';

describe('MngCazaComponent', () => {
  let component: MngCazaComponent;
  let fixture: ComponentFixture<MngCazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngCazaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngCazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
