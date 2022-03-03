import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators'; 
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FlightListingFilterService {

  flightFilterUrl: string = "/booking/flight/search";

  constructor(public http: HttpClient) { 
  }

 
  
  postFlightFilters(input: string[]){
    this.http.post<any>(this.flightFilterUrl, { title: 'Flight Filter Post Request' }).subscribe(data => { "";}) 
  }

  
}


