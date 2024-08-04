import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageApiDialogComponent } from './page-api-dialog.component';

describe('PageApiDialogComponent', () => {
  let component: PageApiDialogComponent;
  let fixture: ComponentFixture<PageApiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageApiDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageApiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
