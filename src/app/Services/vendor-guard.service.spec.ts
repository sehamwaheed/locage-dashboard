import { TestBed } from '@angular/core/testing';

import { VendorGuardService } from './vendor-guard.service';

describe('VendotGuardService', () => {
  let service: VendorGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
