import { TestBed } from '@angular/core/testing';

import { Usesrtories2Service } from './usesrtories2.service';

describe('Usesrtories2Service', () => {
  let service: Usesrtories2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Usesrtories2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
