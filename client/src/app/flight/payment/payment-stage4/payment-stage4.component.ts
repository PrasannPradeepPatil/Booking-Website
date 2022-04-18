import { PassengerInformation } from './../../../model/passenger-info';
import { FlightDetails } from './../../../model/flightDetails.models';
import { FlightDetailsService } from './../../service/flight-details.service';
import { Component, OnInit } from '@angular/core';
import {faArrowRightLong, faMinus} from '@fortawesome/free-solid-svg-icons';
import { Util } from 'src/app/common/util';


@Component({
  selector: 'app-payment-stage4',
  templateUrl: './payment-stage4.component.html',
  styleUrls: ['./payment-stage4.component.css']
})
export class PaymentStage4Component implements OnInit {

  faArrowRightLongIcon = faArrowRightLong;
  faMinusIcon = faMinus;
  id: string;
  email: string;
  contact: string;
  first_name: string;
  last_name: string;
  gender: string;
  price: number;
  flightDetails: FlightDetails = this.flightDetailsService.getFlightDetails();
  returnFlightDetails: FlightDetails = this.flightDetailsService.getReturnFlightDetails();
  data = this.flightDetailsService.getPassengerInformation()

  constructor(private flightDetailsService : FlightDetailsService, private util: Util) 
  { 

  }

  ngOnInit(): void {
    this.id = this.data.Id;
    this.email = this.data.email;
    this.contact = this.data.contact;
    this.first_name = this.data.first_name;
    this.last_name = this.data.last_name;
    this.gender = this.data.gender;
    this.price = this.flightDetails.ticketType === 'economy' ? this.flightDetails.standardPrice : this.flightDetails.flexiblePrice;

    if(this.returnFlightDetails)
    {
      this.price = this.flightDetails.ticketType === 'economy' ? this.flightDetails.standardPrice + this.returnFlightDetails.standardPrice
                                                               : this.flightDetails.flexiblePrice + this.returnFlightDetails.flexiblePrice;
    }
    
    console.log(this.id);
   }

  getTimetoDisplay(totalMinutes: number)
  {
    var hours = Math.floor(totalMinutes / 60);          
    var minutes = totalMinutes % 60;
    return hours+ "h : " + minutes + "m";
  }

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

  transform(input: string)
  {
    return this.util.transform(input);
  }

}
