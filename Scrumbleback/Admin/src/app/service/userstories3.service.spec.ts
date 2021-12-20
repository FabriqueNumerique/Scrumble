import { TestBed } from '@angular/core/testing';

import { Userstories3Service } from './userstories3.service';

describe('Userstories3Service', () => {
  let service: Userstories3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Userstories3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
