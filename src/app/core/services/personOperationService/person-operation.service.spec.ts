import { TestBed } from '@angular/core/testing';

import { PersonOperationService } from './person-operation.service';

describe('PersonOperationService', () => {
  let service: PersonOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
