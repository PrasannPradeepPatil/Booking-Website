import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from "@angular/common/http"

import { HotelDetails} from '../model/hotel-details.model';
import { HotelPayment } from '../model/hotel-payment.model';

@Injectable({
  providedIn: 'root'
})
export class HotelPaymentStage2Service {

  constructor(public http: HttpClient) { }

  sendUserDetails(input:HotelPayment){
    //post this ip to backend
    //receive the response from BE
    //then in this metod route to new method 
    
    console.log("HOTEL PAYMENT STAGE1 DETAILS");
    console.log(input);

  }
}
