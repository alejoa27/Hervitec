import { TestBed } from '@angular/core/testing';

import { ViewservicioService } from './viewservicio.service';

describe('ViewservicioService', () => {
  let service: ViewservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
