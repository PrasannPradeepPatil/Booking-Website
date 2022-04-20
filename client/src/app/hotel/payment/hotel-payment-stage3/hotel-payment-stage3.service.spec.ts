import { TestBed } from '@angular/core/testing';

import { HotelPaymentStage3Service } from './hotel-payment-stage3.service';

describe('HotelPaymentStage3Service', () => {
  let service: HotelPaymentStage3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelPaymentStage3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
