import { TestBed } from '@angular/core/testing';

import { Userstories1Service } from './userstories1.service';

describe('Userstories1Service', () => {
  let service: Userstories1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Userstories1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
