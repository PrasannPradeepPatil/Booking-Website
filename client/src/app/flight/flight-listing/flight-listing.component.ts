import { FlightSearchService } from '../flight-search/flight-search-service';
import { FlightDetailsService } from '../service/flight-details.service';
import { Component, OnInit } from '@angular/core';
import { FlightDetails } from '../../model/flightDetails.models';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightSearch } from 'src/app/model/flight-search.model';


@Component({
  selector: 'app-flight-listing',
  templateUrl: './flight-listing.component.html',
  styleUrls: ['./flight-listing.component.css']
})
export class FlightListingComponent implements OnInit {

  flightDetails: FlightDetails[] =[];
  private currentFlightSearch: FlightSearch;
  sortType: string = '';
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

  openXl(flightId: string, startDate: string, returnFlightId?: string, returnStartDate?: string) {
    const modalRef = this.modalService.open(FlightDetailsComponent, { size: 'xl' });
    modalRef.componentInstance.flight_id = flightId;
    modalRef.componentInstance.start_date = startDate;
    if(returnFlightId)
    {
      modalRef.componentInstance.return_flight_id = returnFlightId;
      modalRef.componentInstance.return_start_date = returnStartDate;
    }
  }

  onSort(type: string)
  {
    this.sortType = type;

    if(type== 'price')
    {
      this.currentFlightSearch = this.flightSearchService.getCurrentFlightSearch();
      this.currentFlightSearch.priceRangeFilter = 'A';
      this.currentFlightSearch.journeyTimeFilter = 'D';
      this.flightSearchService.updateFlightSearch(this.currentFlightSearch);
    }
    else
    {
      this.currentFlightSearch = this.flightSearchService.getCurrentFlightSearch();
      this.currentFlightSearch.journeyTimeFilter = 'A';
      this.currentFlightSearch.priceRangeFilter = 'D';
      this.flightSearchService.updateFlightSearch(this.currentFlightSearch);
    }
  }







  

}
