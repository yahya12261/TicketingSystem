import { TestBed } from '@angular/core/testing';

import { AdditionalServiceFieldListService } from './additional-service-field-list.service';

describe('AdditionalServiceFieldListService', () => {
  let service: AdditionalServiceFieldListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalServiceFieldListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
