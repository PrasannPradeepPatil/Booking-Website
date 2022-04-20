import { TestBed } from '@angular/core/testing';

import { HotelPaymentStage1Service } from './hotel-payment-stage1.service';

describe('HotelPaymentStage1Service', () => {
  let service: HotelPaymentStage1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelPaymentStage1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
