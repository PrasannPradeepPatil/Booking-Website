import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FlightDetails } from '../model/flightDetails.models';

@Injectable({
  providedIn: 'root'
})
export class FlightDetailsService {
  url: string = "https://jsonplaceholder.typicode.com/todos/1"
  flightDetails: FlightDetails[] =[];
  constructor(private http: HttpClient) { }

  getFlightDetails(){
    var obj1 = {"sourceString":"a","destinationString":"v","startDate":{"year":2022,"month":2,"day":1},"endDate":{"year":2022,"month":2,"day":11},"tripType":"round-trip"};
    console.log(this.http.get(this.url));


  }
}
