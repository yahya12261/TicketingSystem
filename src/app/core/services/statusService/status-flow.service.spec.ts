import { TestBed } from '@angular/core/testing';

import { StatusFlowService } from './status-flow.service';

describe('StatusFlowService', () => {
  let service: StatusFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
