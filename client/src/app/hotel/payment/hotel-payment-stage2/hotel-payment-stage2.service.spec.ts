import { TestBed } from '@angular/core/testing';

import { HotelPaymentStage2Service } from './hotel-payment-stage2.service';

describe('HotelPaymentStage2Service', () => {
  let service: HotelPaymentStage2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelPaymentStage2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
