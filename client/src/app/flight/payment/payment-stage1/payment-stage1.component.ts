import { FlightDetails } from './../../../model/flightDetails.models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightDetailsService } from '../../service/flight-details.service';

@Component({
  selector: 'app-payment-stage1',
  templateUrl: './payment-stage1.component.html',
  styleUrls: ['./payment-stage1.component.css']
})
export class PaymentStage1Component implements OnInit {

  flightDetails: FlightDetails = this.flightDetailsService.getFlightDetails();

  constructor(private router: Router, private flightDetailsService: FlightDetailsService ) { }

  selectedTicketType: string;

  ngOnInit(): void {}


  selectTicketType(input: string)
  {
    this.selectedTicketType = input;
  }

  getTicketType()
  {
    return this.selectTicketType;
  }

  next()
  {
    this.router.navigate(['/payment']);
  }
}
