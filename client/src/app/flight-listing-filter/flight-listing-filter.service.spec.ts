import { TestBed } from '@angular/core/testing';

import { FlightListingFilterService } from './flight-listing-filter.service';

describe('FlightListingFilterService', () => {
  let service: FlightListingFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightListingFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
