import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownDialogComponent } from './town-dialog.component';

describe('TownDialogComponent', () => {
  let component: TownDialogComponent;
  let fixture: ComponentFixture<TownDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TownDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
