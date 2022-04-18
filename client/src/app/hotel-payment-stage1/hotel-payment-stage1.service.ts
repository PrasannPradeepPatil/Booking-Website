import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from "@angular/common/http"
import { BehaviorSubject } from 'rxjs';

import { HotelPayment } from '../model/hotel-payment.model';


@Injectable({
  providedIn: 'root'
})
export class HotelPaymentStage1Service {

  hotelPaymentUrl: string = "/booking/hotelPayment";
  hotelPayment:HotelPayment;
  private hotelPaymentStage1Emmiter = new BehaviorSubject<HotelPayment>(null);
  hotelPaymentStage1Observable = this.hotelPaymentStage1Emmiter.asObservable();
  constructor(public http: HttpClient) { }

  sendUserDetails(input : HotelPayment){
    this.hotelPaymentStage1Emmiter.next(input);
  }

}
