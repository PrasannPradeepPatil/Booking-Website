import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStage4Component } from './payment-stage4.component';

describe('PaymentStage4Component', () => {
  let component: PaymentStage4Component;
  let fixture: ComponentFixture<PaymentStage4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentStage4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
