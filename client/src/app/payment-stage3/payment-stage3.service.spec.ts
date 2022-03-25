import { TestBed } from '@angular/core/testing';

import { PaymentStage3Service } from './payment-stage3.service';

describe('PaymentStage3Service', () => {
  let service: PaymentStage3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentStage3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
