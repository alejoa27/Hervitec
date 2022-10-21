import { TestBed } from '@angular/core/testing';

import { SendrecoveryService } from './sendrecovery.service';

describe('SendrecoveryService', () => {
  let service: SendrecoveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendrecoveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
