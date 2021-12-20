import { TestBed } from '@angular/core/testing';

import { PbcarteService } from './pbcarte.service';

describe('PbcarteService', () => {
  let service: PbcarteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PbcarteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
