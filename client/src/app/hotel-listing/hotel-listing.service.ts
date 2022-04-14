import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from "@angular/common/http"
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HotelListingService {

  hotelDetailssUrl: string = "/booking/hotelDetails";

  constructor(public http: HttpClient) { 

  }

  getHotelDetails(id : String){
  }






}
