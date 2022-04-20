import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from "@angular/common/http"

import { HotelDetails} from '../../../model/hotel-details.model';
import { HotelPayment } from '../../../model/hotel-payment.model';

@Injectable({
  providedIn: 'root'
})
export class HotelPaymentStage2Service {
  paymentUrl: string = "/booking/hotelPayment";
  constructor(public http: HttpClient) { }

  sendUserDetails(input:HotelPayment){
    this.http.post<{"Status": "","OtpCode": "","ErrorCode": ""}>(this.paymentUrl,input).subscribe(
      (response) =>{
        console.log("PAYMENT RESPONSE RECEIVED.....")
        console.log(response)
      }
    )


  }
}
