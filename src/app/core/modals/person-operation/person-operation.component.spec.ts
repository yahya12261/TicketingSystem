import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonOperationComponent } from './person-operation.component';

describe('PersonOperationComponent', () => {
  let component: PersonOperationComponent;
  let fixture: ComponentFixture<PersonOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
