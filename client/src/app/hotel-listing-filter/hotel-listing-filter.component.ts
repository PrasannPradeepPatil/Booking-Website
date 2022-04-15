import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hotel-listing-filter',
  templateUrl: './hotel-listing-filter.component.html',
  styleUrls: ['./hotel-listing-filter.component.css']
})
export class HotelListingFilterComponent implements OnInit {

  constructor() { }
  outboundClicked:boolean = true;
  flightFilterForm: FormGroup = new FormGroup({
    outBoundDepartureDuration1: new FormControl(''),
    outBoundDepartureDuration2: new FormControl(''),
    outBoundDepartureDuration3: new FormControl(''),
    outBoundDepartureDuration4: new FormControl(''),
    outBoundArrivalDuration1: new FormControl(''),
    outBoundArrivalDuration2: new FormControl(''),
    outBoundArrivalDuration3: new FormControl(''),
    outBoundArrivalDuration4: new FormControl(''),
  });

  ngOnInit(): void {
  }

}
