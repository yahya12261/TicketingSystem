import { TestBed } from '@angular/core/testing';

import { AdditionalServiceFieldService } from './additional-service-field.service';

describe('AdditionalServiceFieldService', () => {
  let service: AdditionalServiceFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalServiceFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
