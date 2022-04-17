import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FlightDetails } from '../../model/flightDetails.models';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs';
import { PassengerInformation } from 'src/app/model/passenger-info';

@Injectable({
  providedIn: 'root'
})
export class FlightDetailsService {
  url: string = "https://jsonplaceholder.typicode.com/todos/1"
  flightDetailsArray: FlightDetails[] =[];
  flightDetails: FlightDetails;
  returnFlightDetails: FlightDetails;

  passengerInformation: PassengerInformation;
  ticketPriceURL: string = "/booking/price";

  constructor(private http: HttpClient) { }

  private messageSource = new BehaviorSubject<FlightDetails[]>(null);
  currentMessage = this.messageSource.asObservable();

  passengerInfoSubject = new Subject<PassengerInformation>();

  getFlightDetails()
  {
    return this.flightDetails;
  }

  getReturnFlightDetails()
  {
    console.log("get");
    console.log(this.returnFlightDetails);
    return this.returnFlightDetails;
  }

  setPassengerInformation(passengerInformation : PassengerInformation)
  {
    this.passengerInformation = passengerInformation;
  }

  getPassengerInformation()
  {
    return this.passengerInformation;
  }

  setFlightDetails(flightDetails: FlightDetails)
  {
    this.flightDetails = flightDetails;
    this.populateTicketPrice(this.flightDetails);
  }


  populateTicketPrice(flightDetails: FlightDetails)
  {
    this.http.post<FlightDetails>(this.ticketPriceURL, {ID: flightDetails.id}).subscribe(response => 
      { 
        this.flightDetails.standardPrice = response.standardPrice;
        this.flightDetails.flexiblePrice = response.flexiblePrice;
        console.log("Im here now");
        console.log(this.flightDetails);
      });
  }

  setReturnFlightDetails(flightDetails: FlightDetails)
  {
    this.returnFlightDetails = flightDetails;
    this.populateTicketPrice(this.returnFlightDetails);
  }


  populateReturnTicketPrice(flightDetails: FlightDetails)
  {
    this.http.post<FlightDetails>(this.ticketPriceURL, {ID: flightDetails.id}).subscribe(response => 
      { 
        this.returnFlightDetails.standardPrice = response.standardPrice;
        this.returnFlightDetails.flexiblePrice = response.flexiblePrice;
      });
  }

  setTicketType(ticketType: string)
  {
    this.flightDetails.ticketType = ticketType;
  }
}
