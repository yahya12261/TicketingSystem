import { TestBed } from '@angular/core/testing';

import { CazaService } from './caza.service';

describe('CazaService', () => {
  let service: CazaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CazaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
