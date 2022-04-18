import { Util } from 'src/app/common/util';
import { Router } from '@angular/router';
import { FlightDetailsService } from './../../service/flight-details.service';
import { PassengerInformation } from '../../../model/passenger-info';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightDetails } from 'src/app/model/flightDetails.models';

@Component({
  selector: 'app-flight-payment',
  templateUrl: './flight-payment.component.html',
  styleUrls: ['./flight-payment.component.css']
})
export class FlightPaymentComponent implements OnInit {

  constructor(private fb: FormBuilder, private flightDetailsService: FlightDetailsService, 
              private router: Router, private util: Util) { }

  userForm :FormGroup;
  passengerInfo : PassengerInformation;
  submitted = false;
  price: number;
  flightDetails: FlightDetails = this.flightDetailsService.getFlightDetails();
  returnFlightDetails: FlightDetails = this.flightDetailsService.getReturnFlightDetails();

  check: FormControl = new FormControl('',Validators.required);

  ngOnInit(): void {

    this.userForm = this.fb.group({
      email: '',
      contact: '',
      first_name: '',
      last_name: '',
      gender: '',
      check: '',
    });
    this.price = this.flightDetails.ticketType === 'economy' ? this.flightDetails.standardPrice : this.flightDetails.flexiblePrice;

    if(this.returnFlightDetails)
    {
      this.price = this.flightDetails.ticketType === 'economy' ? this.flightDetails.standardPrice + this.returnFlightDetails.standardPrice
                                                               : this.flightDetails.flexiblePrice + this.returnFlightDetails.flexiblePrice;
    }
  }

  onFormSubmit(form: FormGroup)
  {
    this.submitted = true;
    console.log(this.userForm.get('check').touched);

    console.log(this.userForm.get('check').invalid);

        // stop here if form is invalid
        // if (this.userForm.invalid) {
        //     return;
        // }

    console.log(form);
    this.passengerInfo = new PassengerInformation(this.userForm.get('email').value,this.userForm.get('contact').value,this.userForm.get('first_name').value, this.userForm.get('last_name').value, this.userForm.get('gender').value);
    console.log(this.passengerInfo);
    // this.flightDetailsService.passengerInfoSubject.next(this.passengerInfo);
    this.flightDetailsService.setPassengerInformation(this.passengerInfo);
    this.router.navigate(['/paymentInput']);
    // this.flightSearchService.searchFlights(this.flightSearch);   
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
}
