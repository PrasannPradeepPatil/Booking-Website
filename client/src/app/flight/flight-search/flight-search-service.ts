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
    searchOneTimeFlightUrl: string = "/booking/searchFlights";
    searchRoundTripFlightUrl: string = "/booking/searchRTFlights";
    getFlightsUrl: string = "/booking/flights";
    getFlightDetailsUrl: string = "/booking/flightDetails";
    flightDetails: FlightDetails;
    flightDetailsArray: FlightDetails[];


    private messageSource = new BehaviorSubject<FlightDetails[]>(null);
    currentMessage = this.messageSource.asObservable();

    private flightDetailByID = new BehaviorSubject<FlightDetails>(null);
    flightDetailByIDObservable = this.flightDetailByID.asObservable();

    private returnFlightDetailByID = new BehaviorSubject<FlightDetails>(null);
    returnFlightDetailByIDObservable = this.returnFlightDetailByID.asObservable();

    private currentFlightSearch: FlightSearch;



    constructor(public http: HttpClient){}

    getSuggestions(input: string)
    {
        return this.http.post<AirportSearch[]>(this.getSuggestionUrl, {'ArptSrchString' : input});
    }

    searchFlights(input: FlightSearch)
    {
        this.currentFlightSearch = input;
        if(this.currentFlightSearch.isRoundTrip == 'true')
        {
            this.http.post<FlightDetails[]>(this.searchRoundTripFlightUrl, input, httpOptions).subscribe(
                response => {
                    this.flightDetailsArray = response;
                    this.messageSource.next(this.flightDetailsArray);
                }
              );
        }
        else
        {
            this.http.post<FlightDetails[]>(this.searchOneTimeFlightUrl, input, httpOptions).subscribe(
                response => {
                    this.flightDetailsArray = response;
                    this.messageSource.next(this.flightDetailsArray);
                }
              );
        }
    }

    getCurrentFlightSearch()
    {
        return this.currentFlightSearch;
    }

    updateFlightSearch(input: FlightSearch)
    {
        this.currentFlightSearch = input;
        if(this.currentFlightSearch.isRoundTrip == 'true')
        {
            this.http.post<FlightDetails[]>(this.searchRoundTripFlightUrl, input, httpOptions).subscribe(
                response => {
                    this.flightDetailsArray = response;
                    this.messageSource.next(this.flightDetailsArray);
                }
              );
        }
        else
        {
            this.http.post<FlightDetails[]>(this.searchOneTimeFlightUrl, input, httpOptions).subscribe(
                response => {
                    this.flightDetailsArray = response;
                    this.messageSource.next(this.flightDetailsArray);
                }
              );
        }

    }


    getFlights(input: FlightSearch)
    {
        this.http.get<FlightDetails[]>(this.getFlightsUrl).subscribe((response) => {this.messageSource.next(response)});
        return this.http.get(this.getFlightsUrl);
    }
    
    getFlightsById(id: string, start_date: string, return_id?: string, return_start_date?: string)
    {
        if(return_id)
        {
            this.http.post<FlightDetails>(this.getFlightDetailsUrl, { ID : id, Startdate: start_date}).subscribe((response) => {
                this.flightDetails = response;
                this.flightDetails.departureTime = start_date;
                this.flightDetailByID.next(this.flightDetails);
            });

            this.http.post<FlightDetails>(this.getFlightDetailsUrl, { ID : return_id, Startdate: return_start_date}).subscribe((response) => {
                this.flightDetails = response;
                this.flightDetails.departureTime = return_start_date;
                this.returnFlightDetailByID.next(this.flightDetails);
            });
        }
        else
        {
            this.http.post<FlightDetails>(this.getFlightDetailsUrl, { ID : id, Startdate: start_date}).subscribe((response) => {
                this.flightDetails = response;
                this.flightDetails.departureTime = start_date;
                this.flightDetailByID.next(this.flightDetails);
            });
        }
        
    }
} 