import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPaymentStage2Component } from './hotel-payment-stage2.component';

describe('HotelPaymentStage2Component', () => {
  let component: HotelPaymentStage2Component;
  let fixture: ComponentFixture<HotelPaymentStage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelPaymentStage2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelPaymentStage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
