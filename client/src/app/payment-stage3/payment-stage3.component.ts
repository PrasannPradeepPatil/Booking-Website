import { Component, OnInit } from '@angular/core';


import { PaymentStage3Service } from './payment-stage3.service';

@Component({
  selector: 'app-payment-stage3',
  templateUrl: './payment-stage3.component.html',
  styleUrls: ['./payment-stage3.component.css']
})
export class PaymentStage3Component implements OnInit {

  paymentDetails: string[] 
  


  constructor() { }

  ngOnInit(): void {
  }


  getPaymentDetails(){


  }



}
