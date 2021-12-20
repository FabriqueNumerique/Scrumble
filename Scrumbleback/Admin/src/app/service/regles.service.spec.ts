import { TestBed } from '@angular/core/testing';

import { ReglesService } from './regles.service';

describe('ReglesService', () => {
  let service: ReglesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReglesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
