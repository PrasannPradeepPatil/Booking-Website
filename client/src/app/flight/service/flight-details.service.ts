import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FlightDetails } from '../../model/flightDetails.models';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs';
import { PassengerInformation } from 'src/app/model/passenger-info';
import { FlightConfirmation } from 'src/app/model/flight-confirmation.model';

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
  verifyOTPURL: string = "/booking/payment";
  flightConfirmationURL: string ='/booking/flightConfirm';


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
        this.flightDetails.standardPrice = Number(response.standardPrice);
        this.flightDetails.flexiblePrice = Number(response.flexiblePrice);
        console.log("Im here now");
        console.log(this.flightDetails);
      });
  }

  setReturnFlightDetails(flightDetails: FlightDetails)
  {
    this.returnFlightDetails = flightDetails;
    this.populateReturnTicketPrice(this.returnFlightDetails);
  }


  populateReturnTicketPrice(flightDetails: FlightDetails)
  {
    this.http.post<FlightDetails>(this.ticketPriceURL, {ID: flightDetails.id}).subscribe(response => 
      { 
        this.returnFlightDetails.standardPrice = Number(response.standardPrice);
        this.returnFlightDetails.flexiblePrice = Number(response.flexiblePrice);
      });
  }

  setTicketType(ticketType: string)
  {
    this.flightDetails.ticketType = ticketType;
  }

  verifyOTP()
  {
    return this.http.post<any>(this.verifyOTPURL, 
                          {CustomerName: this.passengerInformation.first_name + " " + this.passengerInformation.last_name,
                           MobileNumber: this.passengerInformation.contact,
                           EmailAdd: this.passengerInformation.email });
  }

  saveConfirmation(flightConfirmation: FlightConfirmation)
  {
    console.log("Flight confirm");
    console.log(flightConfirmation);
    this.http.post<any>(this.flightConfirmationURL, flightConfirmation).subscribe(response =>
      {});
  }
}
