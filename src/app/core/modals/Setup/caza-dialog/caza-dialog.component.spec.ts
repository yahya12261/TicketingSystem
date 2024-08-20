import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CazaDialogComponent } from './caza-dialog.component';

describe('CazaDialogComponent', () => {
  let component: CazaDialogComponent;
  let fixture: ComponentFixture<CazaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CazaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CazaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
