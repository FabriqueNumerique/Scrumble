import { TestBed } from '@angular/core/testing';

import { DaylicarteService } from './daylicarte.service';

describe('DaylicarteService', () => {
  let service: DaylicarteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaylicarteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
