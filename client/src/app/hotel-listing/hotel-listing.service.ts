import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from "@angular/common/http"
import { BehaviorSubject } from 'rxjs';

import { HotelDetails } from '../model/hotel-details.model';

@Injectable({
  providedIn: 'root'
})
export class HotelListingService {

  hotelDetailssUrl: string = "/booking/hotelDetails";
  hotelDetails: HotelDetails
  constructor(public http: HttpClient) { 

  }

  getHotelDetails(id : String){
    this.http.post<HotelDetails>(this.hotelDetailssUrl, {"ID": id}).subscribe(
      (response) =>{
        this.hotelDetails = response
        console.log("HOTEL DETAILS")
        console.log(this.hotelDetails)
      }
    )
  }






}
