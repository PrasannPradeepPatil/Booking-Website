import { Util } from 'src/app/common/util';
import { FlightDetails } from './../../../model/flightDetails.models';
import { FlightDetailsService } from './../../service/flight-details.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


import { PaymentStage3Service } from './payment-stage3.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentStage4Component } from '../payment-stage4/payment-stage4.component';

@Component({
  selector: 'app-payment-stage3',
  templateUrl: './payment-stage3.component.html',
  styleUrls: ['./payment-stage3.component.css']
})
export class PaymentStage3Component implements OnInit {

  paymentDetails: string[] 
  flightDetails: FlightDetails = this.flightDetailsService.getFlightDetails();
  returnFlightDetails: FlightDetails = this.flightDetailsService.getReturnFlightDetails();
  price: number;
  otp: string; 
  isSuccess: boolean; 
  showError = false;
  fetchedOTP: string;

  constructor(private router: Router, private flightDetailsService: FlightDetailsService, private util: Util,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.price = this.flightDetails.ticketType === 'economy' ? this.flightDetails.standardPrice : this.flightDetails.flexiblePrice;
    if(this.returnFlightDetails)
    {
      this.price = this.flightDetails.ticketType === 'economy' ? this.flightDetails.standardPrice + this.returnFlightDetails.standardPrice
                                                               : this.flightDetails.flexiblePrice + this.returnFlightDetails.flexiblePrice;
    }

    this.flightDetailsService.verifyOTP().subscribe(
      response => 
      {this.fetchedOTP= response.otpCode;});
        
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

  confirmPayment(content: any)
  {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  onOtpChange(event: string)
  {
    if(event.length == 6)
    {
      if(this.fetchedOTP === event)
      {
        this.isSuccess = true;
      }
    }
  }

  verify() 
  {
    if(this.isSuccess == true)
    {
      this.showError = false;
      this.modalService.dismissAll();
      this.router.navigate(['/paymentConfirmation']);
    }
    else
    {
      this.showError = true;
    }
  }

}
