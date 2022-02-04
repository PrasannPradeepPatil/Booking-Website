import { FlightDetails } from './../model/flightDetails.models';
import { FlightSearch } from './../model/flight-search.model';
import { AirportSearch } from './../model/airport-search.model';

// import { Observable } from "rxjs/Rx"
import { Injectable } from "@angular/core"
import { HttpClient , HttpResponse } from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators'; 
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
    getSuggestionUrl: string = "/booking/airports";
    searchFlightUrl: string = "/booking/flight/search";
    getFlightsUrl: string = "/booking/flights";

    private messageSource = new BehaviorSubject<FlightDetails[]>(null);
    currentMessage = this.messageSource.asObservable();

    constructor(public http: HttpClient){}

    getSuggestions(input: string)
    {
        return this.http.get(this.getSuggestionUrl);
    }

    searchFlights(input: FlightSearch)
    {
        console.log("making post request ");
        // this.http.post("/booking/airports", FlightSearch, httpOptions).pipe(
        //     catchError()
        //   );;

        this.getFlights(input);
    }


    getFlights(input: FlightSearch)
    {
        this.http.get<FlightDetails[]>(this.getFlightsUrl).subscribe((response) => {
            this.messageSource.next(response)});
        return this.http.get(this.getFlightsUrl);
    }
} 