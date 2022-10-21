import { TestBed } from '@angular/core/testing';

import { UpdateTypeUserService } from './update-type-user.service';

describe('UpdateTypeUserService', () => {
  let service: UpdateTypeUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateTypeUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
