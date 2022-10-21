import { TestBed } from '@angular/core/testing';

import { ServiceFilterServiceService } from './service-filter-service.service';

describe('ServiceFilterServiceService', () => {
  let service: ServiceFilterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFilterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
