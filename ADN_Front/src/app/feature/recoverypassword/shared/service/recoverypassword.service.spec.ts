import { TestBed } from '@angular/core/testing';

import { RecoverypasswordService } from './recoverypassword.service';

describe('RecoverypasswordService', () => {
  let service: RecoverypasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoverypasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
