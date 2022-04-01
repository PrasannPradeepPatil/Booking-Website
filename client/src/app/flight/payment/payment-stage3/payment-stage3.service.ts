import { Injectable } from "@angular/core"
import { HttpClient , HttpResponse } from "@angular/common/http"


import { PaymentStage3 } from '../../../model/payment-stage3.model';




@Injectable({
  providedIn: 'root'
})

export class PaymentStage3Service {


  searchFlightUrl: string = "/booking/flight/search";
  paymentStage3:PaymentStage3


  constructor(public http: HttpClient) {}

  getPaymentDetails(){

    //ip : arr of ips from "form"
    //post arr at url and subscribe to the response 
    //return the response from the BE





  }



}
