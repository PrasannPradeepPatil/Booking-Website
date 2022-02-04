import { FlightSearchService } from './../flight-search/flight-search-service';
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
  constructor(private flightSearchService: FlightSearchService) { 

  }

  ngOnInit(): void {

    this.flightSearchService.currentMessage.subscribe((response: any)=>
    {
      this.flightDetails = response;
    })
  }


  getTimetoDisplay(totalMinutes: number)
  {
    var hours = Math.floor(totalMinutes / 60);          
    var minutes = totalMinutes % 60;
    return hours+ "h : " + minutes + "m";
  }







  

}
