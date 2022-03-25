import { FlightSearchService } from '../flight-search/flight-search-service';
import { FlightDetailsService } from '../service/flight-details.service';
import { Component, OnInit } from '@angular/core';
import { FlightDetails } from '../../model/flightDetails.models';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-flight-listing',
  templateUrl: './flight-listing.component.html',
  styleUrls: ['./flight-listing.component.css']
})
export class FlightListingComponent implements OnInit {

  flightDetails: FlightDetails[] =[];
  constructor(private flightSearchService: FlightSearchService, private modalService: NgbModal) { 

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

  openXl(flightId: string) {
    const modalRef = this.modalService.open(FlightDetailsComponent, { size: 'xl' });
    modalRef.componentInstance.flight_id = flightId;
  }







  

}
