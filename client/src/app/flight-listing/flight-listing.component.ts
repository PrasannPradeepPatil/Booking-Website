import { FlightDetailsService } from './../service/flight-details.service';
import { Component, OnInit } from '@angular/core';
import { FlightDetails } from '../model/flightDetails.models';


@Component({
  selector: 'app-flight-listing',
  templateUrl: './flight-listing.component.html',
  styleUrls: ['./flight-listing.component.css']
})
export class FlightListingComponent implements OnInit {

  flightDetails: FlightDetails[] =[];
  constructor(private flightDetailsService: FlightDetailsService) { 

  }

  ngOnInit(): void {

    
  }




  

}
