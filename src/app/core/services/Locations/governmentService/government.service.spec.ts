import { TestBed } from '@angular/core/testing';

import { GovernmentService } from './governmemnt.service';

describe('GovernmemntService', () => {
  let service: GovernmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovernmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
