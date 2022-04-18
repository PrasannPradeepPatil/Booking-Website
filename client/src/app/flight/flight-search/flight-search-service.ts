import { FlightDetails } from '../../model/flightDetails.models';
import { FlightSearch } from '../../model/flight-search.model';
import { AirportSearch } from '../../model/airport-search.model';

// import { Observable } from "rxjs/Rx"
import { Injectable } from "@angular/core"
import { HttpClient , HttpResponse } from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }) };

@Injectable(
    {
        providedIn: 'root'
    }
)
export class FlightSearchService
{
    getSuggestionUrl: string = "/booking/SrchArptAPI";
    searchFlightUrl: string = "/booking/searchFlights";
    getFlightsUrl: string = "/booking/flights";
    getFlightDetailsUrl: string = "/booking/flightDetails";
    flightDetails: FlightDetails;
    flightDetailsArray: FlightDetails[];


    private messageSource = new BehaviorSubject<FlightDetails[]>(null);
    currentMessage = this.messageSource.asObservable();

    private flightDetailByID = new BehaviorSubject<FlightDetails>(null);
    flightDetailByIDMsg = this.flightDetailByID.asObservable();
    private currentFlightSearch: FlightSearch;



    constructor(public http: HttpClient){}

    getSuggestions(input: string)
    {
        return this.http.post<AirportSearch[]>(this.getSuggestionUrl, {'ArptSrchString' : input});
    }

    searchFlights(input: FlightSearch)
    {
        this.currentFlightSearch = input;
        this.http.post<FlightDetails[]>(this.searchFlightUrl, input, httpOptions).subscribe(
            response => {
                this.flightDetailsArray = response;
                this.messageSource.next(this.flightDetailsArray);
            }
          );

        // this.getFlights(input);
    }

    getCurrentFlightSearch()
    {
        return this.currentFlightSearch;
    }


    getFlights(input: FlightSearch)
    {
        this.http.get<FlightDetails[]>(this.getFlightsUrl).subscribe((response) => {this.messageSource.next(response)});
        return this.http.get(this.getFlightsUrl);
    }
    
    getFlightsById(id: string)
    {
        this.http.post<FlightDetails>(this.getFlightDetailsUrl, { ID : "001"}).subscribe((response) => {
            this.flightDetails = response;
            this.flightDetailByID.next(this.flightDetails);
        });
    }
} 