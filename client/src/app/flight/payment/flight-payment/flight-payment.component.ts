import { PassengerInformation } from '../../../model/passenger-info';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-payment',
  templateUrl: './flight-payment.component.html',
  styleUrls: ['./flight-payment.component.css']
})
export class FlightPaymentComponent implements OnInit {

  constructor() { }

  userForm = new FormGroup({
    email: new FormControl(),
    contact: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    gender: new FormControl(),
    check: new FormControl('', Validators.required),
  });

  passengerInfo : PassengerInformation;
  submitted = false;
  check: FormControl = new FormControl('',Validators.required);

  ngOnInit(): void {
  }

  onFormSubmit()
  {
    this.submitted = true;
    console.log(this.userForm.get('check').touched);

    console.log(this.userForm.get('check').invalid);

        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }

    this.passengerInfo = new PassengerInformation(this.userForm.get('email').value,this.userForm.get('contact').value,this.userForm.get('first_name').value, this.userForm.get('last_name').value, this.userForm.get('gender').value);
    // this.flightSearchService.searchFlights(this.flightSearch);   
  }
}
