import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPaymentStage3Component } from './hotel-payment-stage3.component';

describe('HotelPaymentStage3Component', () => {
  let component: HotelPaymentStage3Component;
  let fixture: ComponentFixture<HotelPaymentStage3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelPaymentStage3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelPaymentStage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
