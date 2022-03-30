import { PassengerInformation } from './../../../model/passenger-info';
import { FlightDetails } from './../../../model/flightDetails.models';
import { FlightDetailsService } from './../../service/flight-details.service';
import { Component, OnInit } from '@angular/core';
import {faArrowRightLong, faMinus} from '@fortawesome/free-solid-svg-icons';


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
  flightDetails: FlightDetails = this.flightDetailsService.getFlightDetails();
  data = this.flightDetailsService.getPassengerInformation()

  constructor(private flightDetailsService : FlightDetailsService) 
  { 

  }

  ngOnInit(): void {
    this.id = this.data.Id;
    this.email = this.data.email;
    this.contact = this.data.contact;
    this.first_name = this.data.first_name;
    this.last_name = this.data.last_name;
    this.gender = this.data.gender;
    console.log(this.id);
   }

  getTimetoDisplay(totalMinutes: number)
  {
    var hours = Math.floor(totalMinutes / 60);          
    var minutes = totalMinutes % 60;
    return hours+ "h : " + minutes + "m";
  }

}
