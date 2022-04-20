import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPaymentStage1Component } from './hotel-payment-stage1.component';

describe('HotelPaymentStage1Component', () => {
  let component: HotelPaymentStage1Component;
  let fixture: ComponentFixture<HotelPaymentStage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelPaymentStage1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelPaymentStage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
