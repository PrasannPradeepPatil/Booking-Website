
// import { Observable } from "rxjs/Rx"
import { Injectable } from "@angular/core"
import { HttpClient , HttpResponse } from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators'; 
import { BehaviorSubject } from 'rxjs';

import { FlightDetails } from './../model/flightDetails.models';
import { FlightSearch } from './../model/flight-search.model';
import { AirportSearch } from './../model/airport-search.model';
import { FlightInDetails } from '../model/flightInDetails';

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
    getSuggestionUrl: string = "/booking/airports";
    searchFlightUrl: string = "/booking/flight/search";
    getFlightsUrl: string = "/booking/flights";
    getFlightDetailsUrl: string = "/booking/flightDetails";
    flightDetails: FlightDetails;

    private messageSource = new BehaviorSubject<FlightDetails[]>(null);
    currentMessage = this.messageSource.asObservable();

    private flightDetailByID = new BehaviorSubject<FlightInDetails>(null);
    flightDetailByIDMsg = this.flightDetailByID.asObservable();
    private currentFlightSearch: FlightSearch;



    constructor(public http: HttpClient){}

    getSuggestions(input: string)
    {
        return this.http.get<AirportSearch[]>(this.getSuggestionUrl);
    }

    searchFlights(input: FlightSearch)
    {
        this.currentFlightSearch = input;
        //console.log("making post request ");
        // this.http.post("/booking/airports", FlightSearch, httpOptions).pipe(
        //     catchError()
        //   );;

        this.getFlights(input);
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
        // console.log("id ");
        // console.log(id);
        this.http.get<FlightInDetails[]>(this.getFlightDetailsUrl).subscribe((response) => {
            // console.log("id ");
            // console.log(id);
            console.log(response.find(x => x.Id === id));
            this.flightDetailByID.next(response.find(x => x.Id === id));
            // console.log(this.flightDetails);
            // return this.flightDetails;
        });
        // return this.http.get(this.getFlightsUrl);
        // console.log("id ");
        // console.log(this.flightDetails);
        // console.log("flight ");
        // console.log(this.flightDetails);
        // return this.flightDetails;
    }
} 