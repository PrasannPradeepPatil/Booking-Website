import { Router } from '@angular/router';
import { FlightDetailsService } from './../../service/flight-details.service';
import { PassengerInformation } from '../../../model/passenger-info';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-payment',
  templateUrl: './flight-payment.component.html',
  styleUrls: ['./flight-payment.component.css']
})
export class FlightPaymentComponent implements OnInit {

  constructor(private fb: FormBuilder, private flightDetailsService: FlightDetailsService, private router: Router) { }

  userForm :FormGroup;
  passengerInfo : PassengerInformation;
  submitted = false;
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

    // this.userForm = new FormGroup({
    //   email: new FormControl(),
    //   contact: new FormControl(),
    //   first_name: new FormControl('Pranali'),
    //   last_name: new FormControl(),
    //   gender: new FormControl(),
    //   check: new FormControl('', Validators.required),
    // });
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
    this.router.navigate(['/paymentConfirmation']);
    // this.flightSearchService.searchFlights(this.flightSearch);   
  }
}
