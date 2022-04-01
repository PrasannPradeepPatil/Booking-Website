import { Util } from 'src/app/common/util';
import { FlightDetails } from './../../../model/flightDetails.models';
import { FlightDetailsService } from './../../service/flight-details.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


import { PaymentStage3Service } from './payment-stage3.service';

@Component({
  selector: 'app-payment-stage3',
  templateUrl: './payment-stage3.component.html',
  styleUrls: ['./payment-stage3.component.css']
})
export class PaymentStage3Component implements OnInit {

  paymentDetails: string[] 
  flightDetails: FlightDetails = this.flightDetailsService.getFlightDetails();
  price: number;

  constructor(private router: Router, private flightDetailsService: FlightDetailsService, private util: Util) { }

  ngOnInit(): void {
    this.price = this.flightDetails.ticketType === 'economy' ? this.flightDetails.standardPrice : this.flightDetails.flexiblePrice;
  }


  getPaymentDetails(){}

  getTaxes(price: number)
  {
    return this.util.getTaxes(price);
  }

  getTotal(price: number)
  {
    return this.util.getTotalFare(price);
  }

  getAirlineFees(price: number)
  {
    return this.util.getAirlineFees(price);
  }

  confirmPayment()
  {
    this.router.navigate(['/paymentConfirmation']);
  }



}
