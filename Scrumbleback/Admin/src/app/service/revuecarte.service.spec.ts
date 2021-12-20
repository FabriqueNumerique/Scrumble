import { TestBed } from '@angular/core/testing';

import { RevuecarteService } from './revuecarte.service';

describe('RevuecarteService', () => {
  let service: RevuecarteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevuecarteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
