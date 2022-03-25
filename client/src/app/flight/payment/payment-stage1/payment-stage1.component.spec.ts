import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStage1Component } from './payment-stage1.component';

describe('PaymentStage1Component', () => {
  let component: PaymentStage1Component;
  let fixture: ComponentFixture<PaymentStage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentStage1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
