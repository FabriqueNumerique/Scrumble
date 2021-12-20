import { TestBed } from '@angular/core/testing';

import { Userstories1A1Service } from './userstories1-a1.service';

describe('Userstories1A1Service', () => {
  let service: Userstories1A1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Userstories1A1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
