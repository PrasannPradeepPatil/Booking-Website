import { Component, OnInit } from '@angular/core';
import { FlightDetails } from '../model/flightDetails.models';

@Component({
  selector: 'app-flight-listing',
  templateUrl: './flight-listing.component.html',
  styleUrls: ['./flight-listing.component.css']
})
export class FlightListingComponent implements OnInit {

  flightDetails: FlightDetails[] =[];
  constructor() { 

  }

  ngOnInit(): void {

    var obj1 = {
      name:"prasann",
      amount:32
    }
    var obj2 = {
      name:"prasann",
      amount:32
    }
    this.flightDetails.push(obj1);
    this.flightDetails.push(obj2);
  
  }

  

}
