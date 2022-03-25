import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators'; 
import { BehaviorSubject } from 'rxjs';
import { FlightListingFilter } from '../../model/flight-listing-filter.model';
import { FlightSearchService } from '../flight-search/flight-search-service';


@Injectable({
  providedIn: 'root'
})
export class FlightListingFilterService {

  searchFlightUrl: string = "/booking/flight/search";
  flightSearchService: FlightSearchService;
    

  constructor(public http: HttpClient, flightSearchService: FlightSearchService) { 

    this.flightSearchService = flightSearchService;
  }

  getFlightDetails(){
    return this.flightSearchService.getCurrentFlightSearch();
  }
 
  
  postFlightDetails(input: FlightListingFilter){
    
    this.http.post<any>(this.searchFlightUrl,input).subscribe(data => { "";}) 
  }



  
}


