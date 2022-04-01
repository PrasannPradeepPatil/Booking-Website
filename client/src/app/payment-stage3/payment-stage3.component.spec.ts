import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStage3Component } from './payment-stage3.component';

describe('PaymentStage3Component', () => {
  let component: PaymentStage3Component;
  let fixture: ComponentFixture<PaymentStage3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentStage3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
