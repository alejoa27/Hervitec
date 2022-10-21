import { TestBed } from '@angular/core/testing';

import { TypeUserGuardService } from './type-user-guard.service';

describe('TypeUserGuardService', () => {
  let service: TypeUserGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeUserGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
