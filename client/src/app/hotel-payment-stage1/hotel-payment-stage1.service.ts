import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from "@angular/common/http"

import { HotelPaymentStage1 } from '../model/hotel-paymentStage1.model';


@Injectable({
  providedIn: 'root'
})
export class HotelPaymentStage1Service {

  hotelPaymentUrl: string = "/booking/hotelPayment";
  hotelPaymentStage1:HotelPaymentStage1;
  constructor(public http: HttpClient) { }

  getUserDetails(input : HotelPaymentStage1){
    this.http.post<{"Status":"","OtpCode":"","ErrorCode":""}>(this.hotelPaymentUrl, input).subscribe((response) => {
      console.log("HOTEL PAYMENT STAGE 1 RESPONSE RECEIVED.....")
      console.log(response);
    })
  }

}
